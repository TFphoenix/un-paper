using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using Azure;
using Azure.Storage.Sas;
using Newtonsoft.Json;
using UNpaper.AzureFunctions.Common;
using UNpaper.AzureFunctions.Models;
using JsonSerializer = System.Text.Json.JsonSerializer;

namespace UNpaper.AzureFunctions.Services
{
    public class BlobStorageService
    {
        private readonly BlobServiceClient _blobServiceClient;
        private readonly CredentialsModel.FormRecognizerCredentials _formRecognizerCredentials;

        public BlobStorageService(string blobStorageConnectionString, CredentialsModel.FormRecognizerCredentials formRecognizerCredentials)
        {
            _blobServiceClient = new BlobServiceClient(blobStorageConnectionString);
            _formRecognizerCredentials = formRecognizerCredentials;
        }

        public async Task CreateContainer(string containerName)
        {
            await _blobServiceClient.CreateBlobContainerAsync(containerName);
        }

        public async Task UploadToBlob(Stream content, string containerName, string blobPath = "")
        {
            // Get blob
            var container = _blobServiceClient.GetBlobContainerClient(containerName);
            BlobClient blob = container.GetBlobClient(blobPath);

            // Upload data to blob
            content.Position = 0;
            await blob.UploadAsync(content, true);
            content.Close();
        }

        public async Task DeleteBlob(string containerName, string blobPath = "")
        {
            // Get blob
            var container = _blobServiceClient.GetBlobContainerClient(containerName);
            BlobClient blob = container.GetBlobClient(blobPath);

            // Delete blob
            await blob.DeleteAsync();
        }

        public async Task DownloadBlob(string containerName, string blobPath = "")
        {
            // Get blob
            var container = _blobServiceClient.GetBlobContainerClient(containerName);
            BlobClient blob = container.GetBlobClient(blobPath);

            // Download blob // TODO
            //BlobDownloadInfo download = await blob.DownloadAsync();
            //using (FileStream downloadFileStream = File.OpenWrite(downloadFilePath))
            //{
            //    await download.Content.CopyToAsync(downloadFileStream);
            //    downloadFileStream.Close();
            //}
        }

        public async Task ListContainerBlobs(string containerName)
        {
            var container = _blobServiceClient.GetBlobContainerClient(containerName);

            await foreach (BlobItem blob in container.GetBlobsAsync())
            {
                Console.WriteLine("Blob name: {0}", blob.Name);
            }
        }

        public async Task<List<DocumentModel>> GetBlobs(string containerName, string blobPath)
        {
            var container = _blobServiceClient.GetBlobContainerClient(containerName);
            var blobs = container.GetBlobsByHierarchyAsync(prefix: blobPath);

            var acquiredBlobs = new List<DocumentModel>();

            await foreach (BlobHierarchyItem blobItem in blobs)
            {
                if (blobItem.IsBlob && !blobItem.Blob.Deleted)
                {
                    var parsedName = blobItem.Blob.Name.Split(BlobConstants.Delimiter)[1];
                    acquiredBlobs.Add(new DocumentModel
                    {
                        Name = parsedName,
                        Length = blobItem.Blob.Properties.ContentLength,
                        ContentType = blobItem.Blob.Properties.ContentType,
                        CreatedOn = blobItem.Blob.Properties.CreatedOn?.DateTime,
                        LastModifiedOn = blobItem.Blob.Properties.LastModified?.DateTime,
                        BlobPath = blobItem.Blob.Name
                    });
                }
            }

            return acquiredBlobs;
        }

        public async Task ListTree(string containersPrefix, int? segmentSize = null)
        {
            try
            {
                // Call the listing operation and enumerate the result segment.
                var resultSegment =
                    _blobServiceClient.GetBlobContainersAsync(BlobContainerTraits.Metadata, containersPrefix, default)
                        .AsPages(default, segmentSize);

                await foreach (Page<BlobContainerItem> containerPage in resultSegment)
                {
                    foreach (BlobContainerItem container in containerPage.Values)
                    {
                        Console.WriteLine("Container name: {0}", container.Name);

                        var blobs = _blobServiceClient.GetBlobContainerClient(container.Name).GetBlobsAsync();
                        await foreach (var blob in blobs)
                        {
                            Console.WriteLine("\tBlob name: {0}", blob.Name);
                        }
                    }

                    Console.WriteLine();
                }
            }
            catch (RequestFailedException e)
            {
                Console.WriteLine(e.Message);
                Console.ReadLine();
                throw;
            }
        }

        public async Task CreateBatchMetadata(BatchModel batch)
        {
            // Set parameters
            string containerName = BlobConstants.OrganizationPrefix + batch.OrganizationId;
            string blobName = $"{BlobConstants.BatchPrefix}{batch.Id}";
            string metadataName = $"{BlobConstants.MetadataPrefix}{BlobConstants.BatchPrefix}{batch.Id}{BlobConstants.MetadataFileType}";
            var metadata = new BatchMetadataModel
            {
                SourceConnection = new BatchMetadataModel.SourceConnectionModel
                {
                    ProviderOptions = new BatchMetadataModel.ProviderOptionsModel
                    {
                        Sas = BlobConstants.HiddenAttribute
                    },
                    Id = batch.OrganizationId,
                    Name = containerName,
                    ProviderType = "azureBlobStorage"
                },
                ApiKey = BlobConstants.HiddenAttribute,
                Name = $"{BlobConstants.MetadataPrefix}{BlobConstants.BatchPrefix}{batch.Id}",
                FolderPath = blobName,
                ApiUriBase = BlobConstants.HiddenAttribute,
                SecurityToken = $"token-{batch.Id}",
                Version = batch.Version,
                Id = batch.Id
            };

            // Get blob
            var container = _blobServiceClient.GetBlobContainerClient(containerName);
            BlobClient blob = container.GetBlobClient(metadataName);

            // Write metadata to blob
            await using (MemoryStream stream = new MemoryStream())
            {
                await JsonSerializer.SerializeAsync(stream, metadata);

                stream.Position = 0;
                await blob.UploadAsync(stream, true);
                stream.Close();
            }
        }

        public async Task<object> GetBatchMetadata(BatchModel batch)
        {
            // Set parameters
            var containerName = $"{BlobConstants.OrganizationPrefix}{batch.OrganizationId}";
            var blobPath = $"{BlobConstants.MetadataPrefix}{BlobConstants.BatchPrefix}{batch.Id}{BlobConstants.MetadataFileType}";
            var container = _blobServiceClient.GetBlobContainerClient(containerName);
            var blob = container.GetBlobClient(blobPath);

            // Download blob and populate metadata
            BatchMetadataModel metadata;
            BlobDownloadInfo download = await blob.DownloadAsync();
            await using (MemoryStream stream = new MemoryStream())
            {
                await download.Content.CopyToAsync(stream);

                stream.Position = 0;
                var streamReader = new StreamReader(stream);
                var content = streamReader.ReadToEnd();
                metadata = JsonConvert.DeserializeObject<BatchMetadataModel>(content);

                stream.Close();
            }

            // Replace hidden metadata attributes
            var containerClient = _blobServiceClient.GetBlobContainerClient(containerName);
            metadata.ApiKey = _formRecognizerCredentials.ApiKey;
            metadata.ApiUriBase = _formRecognizerCredentials.ServiceUri;
            metadata.SourceConnection.ProviderOptions.Sas = GetSasUriForContainer(containerClient).ToString();

            return metadata;
        }

        private static Uri GetSasUriForContainer(BlobContainerClient containerClient, string storedPolicyName = null)
        {
            // Check whether this BlobContainerClient object has been authorized with Shared Key.
            if (containerClient.CanGenerateSasUri)
            {
                // Create a SAS token that's valid for one hour.
                BlobSasBuilder sasBuilder = new BlobSasBuilder()
                {
                    BlobContainerName = containerClient.Name,
                    Resource = "c"
                };

                if (storedPolicyName == null)
                {
                    sasBuilder.ExpiresOn = DateTimeOffset.UtcNow.AddHours(BlobConstants.SasExpirationHours);
                    sasBuilder.SetPermissions(BlobContainerSasPermissions.All);
                    //sasBuilder.SetPermissions(BlobContainerSasPermissions.Read);
                    //sasBuilder.SetPermissions(BlobContainerSasPermissions.Write);
                    //sasBuilder.SetPermissions(BlobContainerSasPermissions.Delete);
                    //sasBuilder.SetPermissions(BlobContainerSasPermissions.List);
                }
                else
                {
                    sasBuilder.Identifier = storedPolicyName;
                }

                Uri sasUri = containerClient.GenerateSasUri(sasBuilder);

                return sasUri;
            }
            else
            {
                throw new AccessViolationException("BlobContainerClient must be authorized with Shared Key credentials to create a service SAS.");
            }
        }
    }
}
