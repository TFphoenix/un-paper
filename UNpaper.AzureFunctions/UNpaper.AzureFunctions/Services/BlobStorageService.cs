using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using System;
using System.IO;
using System.Threading.Tasks;
using Azure;

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

        public async Task ListBlobs(string containersPrefix, int? segmentSize = null)
        {
            try
            {
                // Call the listing operation and enumerate the result segment.
                var resultSegment =
                    _blobServiceClient.GetBlobContainersAsync(BlobContainerTraits.Metadata, containersPrefix, default)
                        .AsPages(default, segmentSize);

                await foreach (Azure.Page<BlobContainerItem> containerPage in resultSegment)
                {
                    foreach (BlobContainerItem containerItem in containerPage.Values)
                    {
                        Console.WriteLine("Container name: {0}", containerItem.Name);
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
