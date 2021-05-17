using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using Azure;
using UNpaper.AzureFunctions.Common;
using UNpaper.AzureFunctions.Models;

namespace UNpaper.AzureFunctions.Services
{
    public class BlobStorageService
    {
        private readonly BlobServiceClient _blobServiceClient;

        public BlobStorageService(string blobStorageConnectionString)
        {
            _blobServiceClient = new BlobServiceClient(blobStorageConnectionString);
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
    }
}
