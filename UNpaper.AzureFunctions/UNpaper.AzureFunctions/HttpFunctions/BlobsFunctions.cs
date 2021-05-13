using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Azure.Storage.Blobs;
using UNpaper.AzureFunctions.Common;
using UNpaper.AzureFunctions.Models;
using UNpaper.AzureFunctions.Services;

namespace UNpaper.AzureFunctions.HttpFunctions
{
    public class BlobsFunctions
    {
        private readonly BlobStorageService _storageService;

        public BlobsFunctions(BlobStorageService storageService)
        {
            _storageService = storageService;
        }

        [FunctionName("Blobs")]
        public async Task<IActionResult> ListAllBlobs(
            [HttpTrigger(AuthorizationLevel.Function, "get", Route = Routes.BlobsRoute)]
            HttpRequest req,
            ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");

            await _storageService.ListTree("unpaper-");

            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            dynamic data = JsonConvert.DeserializeObject(requestBody);

            return new OkObjectResult(data);
        }

        [FunctionName("BlobsUpload")]
        public async Task<IActionResult> UploadDocument(
            [HttpTrigger(AuthorizationLevel.Function, "post", Route = Routes.BlobsRoute + "/{organization}/{batch}")]
            HttpRequest req,
            ILogger log,
            string organization,
            string batch)
        {
            try
            {
                // Get document data
                //var formdata = await req.ReadFormAsync(); // TODO: Used for multiple documents
                var file = req.Form.Files["file"];

                // Ensure document content is valid
                if (file.Length > 0)
                {
                    await using var ms = new MemoryStream();

                    // Convert document data to stream
                    file.CopyTo(ms);

                    // Upload document to blob
                    var containerName = $"{BlobConstants.OrganizationPrefix}{organization}";
                    var blobPath = $"{BlobConstants.BatchPrefix}{batch}/{file.FileName}";
                    await _storageService.UploadBlob(ms, containerName, blobPath);
                }
                else
                {
                    return new BadRequestObjectResult(new ResponseModel
                    {
                        Status = "ERROR",
                        Message = "Invalid document content"
                    });
                }

                // Return successfull response
                return new OkObjectResult(new ResponseModel
                {
                    Status = "SUCCESS",
                    Message = $"Successfully uploaded document \"{file.FileName}\" ({file.Length.ToString()} bytes) to blob"
                });
            }
            catch (Exception ex)
            {
                return new BadRequestObjectResult(ex);
            }
        }

        [FunctionName("BlobsGet")]
        public async Task<IActionResult> GetDocument(
            [HttpTrigger(AuthorizationLevel.Function, "get", Route = Routes.BlobsRoute + "/{id}")]
            HttpRequest req,
            ILogger log,
            string id)
        {
            throw new NotImplementedException();
        }

        [FunctionName("BlobsDelete")]
        public async Task<IActionResult> DeleteDocument(
            [HttpTrigger(AuthorizationLevel.Function, "delete", Route = Routes.BlobsRoute)]
            HttpRequest req,
            ILogger log)
        {
            throw new NotImplementedException();
        }

        [FunctionName("BlobsUpdate")]
        public async Task<IActionResult> UpdateDocument(
            [HttpTrigger(AuthorizationLevel.Function, "put", Route = Routes.BlobsRoute)]
            HttpRequest req,
            ILogger log)
        {
            throw new NotImplementedException();
        }

        [FunctionName("OrganizationsCreate")]
        public async Task<IActionResult> CreateOrganization(
            [HttpTrigger(AuthorizationLevel.Function, "post", Route = Routes.BlobsRoute + "/organizations")]
            HttpRequest req,
            ILogger log)
        {
            try
            {
                string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
                var organization = JsonConvert.DeserializeObject<OrganizationModel>(requestBody);

                await _storageService.CreateContainer(BlobConstants.OrganizationPrefix + new Guid(organization.Id));
                return new OkObjectResult(new ResponseModel
                {
                    Status = "SUCCESS",
                    Message = "Successfully created organization container"
                });
            }
            catch (JsonSerializationException e)
            {
                return new BadRequestObjectResult(new ResponseModel
                {
                    Status = "ERROR",
                    Message = e.Message
                });
            }
            catch
            {
                return new BadRequestObjectResult(new ResponseModel
                {
                    Status = "ERROR",
                    Message = "Can't create organization container"
                });
            }
        }
    }
}

