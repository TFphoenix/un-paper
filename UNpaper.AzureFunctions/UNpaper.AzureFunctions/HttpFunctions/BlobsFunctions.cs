using System;
using System.Collections.Generic;
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

        [FunctionName("BlobsListAll")]
        public async Task<IActionResult> ListAllBlobs(
            [HttpTrigger(AuthorizationLevel.Function, "get",
            Route = Routes.BlobsRoute)]
            HttpRequest req,
            ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");

            await _storageService.ListTree(BlobConstants.GeneralPrefix);

            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            dynamic data = JsonConvert.DeserializeObject(requestBody);

            return new OkObjectResult(data);
        }

        [FunctionName("BlobsGetByPath")]
        public async Task<IActionResult> GetDocuments(
            [HttpTrigger(AuthorizationLevel.Function, "get",
            Route = Routes.BlobsRoute + "/{organization}/{batch}")]
            HttpRequest req,
            ILogger log,
            string organization,
            string batch)
        {
            try
            {
                var containerName = $"{BlobConstants.OrganizationPrefix}{organization}";
                var blobPath = $"{BlobConstants.BatchPrefix}{batch}";
                var documents = await _storageService.GetBlobs(containerName, blobPath);

                return new OkObjectResult(documents);
            }
            catch
            {
                return new BadRequestObjectResult(new ResponseModel
                {
                    Status = "ERROR",
                    Message = "Can't get documents! Ensure given organization and batch are correct"
                });
            }
        }

        [FunctionName("BlobsUpload")]
        public async Task<IActionResult> UploadDocuments(
            [HttpTrigger(AuthorizationLevel.Function, "post",
            Route = Routes.BlobsRoute + "/{organization}/{batch}")]
            HttpRequest req,
            ILogger log,
            string organization,
            string batch)
        {
            try
            {
                // Read documents
                var formData = await req.ReadFormAsync();
                var files = formData.Files;
                if (formData.Files.Count == 0)
                {
                    return new BadRequestObjectResult(new ResponseModel
                    {
                        Status = "ERROR",
                        Message = "No documents provided"
                    });
                }

                // Prepare results
                var results = new List<ResponseModel>();
                var succeeded = 0;

                // Upload documents to blobs
                foreach (var file in files)
                {
                    var result = await UploadDocument(file, organization, batch);

                    if (result.Status.Equals("SUCCESS")) ++succeeded;

                    results.Add(result);
                }

                // Verify results
                if (succeeded == 0)
                {
                    return new BadRequestObjectResult(new
                    {
                        OverallStatus = "ERROR",
                        Results = results
                    });
                }
                else if (succeeded == files.Count)
                {
                    return new OkObjectResult(new
                    {
                        OverallStatus = "SUCCESS",
                        Results = results
                    });
                }
                else
                {
                    return new OkObjectResult(new
                    {
                        OverallStatus = "PARTIAL-SUCCESS",
                        Results = results
                    });
                }
            }
            catch (Exception ex)
            {
                return new BadRequestObjectResult(ex);
            }
        }

        [FunctionName("BlobsGet")]
        public async Task<IActionResult> GetDocument(
            [HttpTrigger(AuthorizationLevel.Function, "get",
            Route = Routes.BlobsRoute + "/{id}")]
            HttpRequest req,
            ILogger log,
            string id)
        {
            throw new NotImplementedException();
        }

        [FunctionName("BlobsDelete")]
        public async Task<IActionResult> DeleteDocuments(
            [HttpTrigger(AuthorizationLevel.Function, "delete",
            Route = Routes.BlobsRoute + "/{organization}/{batch}")]
            HttpRequest req,
            ILogger log,
            string organization,
            string batch)
        {
            // Prepare results
            var succeeded = 0;
            var results = new List<ResponseModel>();
            var documents = new List<DocumentModel>();

            try
            {
                // Get file names
                string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
                documents = JsonConvert.DeserializeObject<List<DocumentModel>>(requestBody);

                // Define blob paths
                var containerName = $"{BlobConstants.OrganizationPrefix}{organization}";
                var blobPath = $"{BlobConstants.BatchPrefix}{batch}/";

                // Delete blobs
                foreach (var document in documents)
                {
                    var result = await DeleteDocument(containerName, blobPath, document.Name);

                    if (result.Status.Equals("SUCCESS")) ++succeeded;

                    results.Add(result);
                }
            }
            catch
            {
                return new BadRequestObjectResult(new ResponseModel
                {
                    Status = "ERROR",
                    Message = $"Can't delete documents because of parameters recieved"
                });
            }

            // Verify results
            if (succeeded == 0)
            {
                return new BadRequestObjectResult(new
                {
                    OverallStatus = "ERROR",
                    Results = results
                });
            }
            else if (succeeded == documents.Count)
            {
                return new OkObjectResult(new
                {
                    OverallStatus = "SUCCESS",
                    Results = results
                });
            }
            else
            {
                return new OkObjectResult(new
                {
                    OverallStatus = "PARTIAL-SUCCESS",
                    Results = results
                });
            }
        }

        [FunctionName("OrganizationsCreate")]
        public async Task<IActionResult> CreateOrganization(
            [HttpTrigger(AuthorizationLevel.Function, "post",
            Route = Routes.BlobsRoute + "/organizations")]
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

        [FunctionName("BatchesMetadataCreate")]
        public async Task<IActionResult> CreateBatchMetadata(
            [HttpTrigger(AuthorizationLevel.Function, "post",
                Route = Routes.BlobsRoute + "/{organization}/{batch}/metadata")]
            HttpRequest req,
            ILogger log,
            string organization,
            string batch)
        {
            try
            {
                await _storageService.CreateBatchMetadata(new BatchModel
                {
                    Id = batch,
                    OrganizationId = organization
                });

                return new OkObjectResult(new ResponseModel
                {
                    Status = "SUCCESS",
                    Message = "Successfully created batch metadata"
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
                    Message = "Can't create batch metadata"
                });
            }
        }

        [FunctionName("BatchesMetadataGet")]
        public async Task<IActionResult> GetBatchMetadata(
            [HttpTrigger(AuthorizationLevel.Function, "get",
                Route = Routes.BlobsRoute + "/{organization}/{batch}/metadata")]
            HttpRequest req,
            ILogger log,
            string organization,
            string batch)
        {
            try
            {
                var batchMetadata = await _storageService.GetBatchMetadata(new BatchModel
                {
                    Id = batch,
                    OrganizationId = organization
                });

                return new OkObjectResult(batchMetadata);
            }
            catch (AccessViolationException exception)
            {
                return new BadRequestObjectResult(new ResponseModel
                {
                    Status = "ERROR",
                    Message = $"Can't get batch metadata! Error generating SAS authorization: {exception.Message}"
                });
            }
            catch
            {
                return new BadRequestObjectResult(new ResponseModel
                {
                    Status = "ERROR",
                    Message = "Can't get batch metadata! Ensure given organization and batch are correct"
                });
            }
        }

        private async Task<ResponseModel> UploadDocument(IFormFile file, string organization, string batch)
        {
            try
            {
                // Ensure document content is valid
                if (file.Length > 0 &&
                    Array.IndexOf(BlobConstants.AcceptedDocumentFormats, file.ContentType) != -1)
                {
                    await using var ms = new MemoryStream();

                    // Convert document data to stream
                    file.CopyTo(ms);

                    // Upload document to blob
                    var containerName = $"{BlobConstants.OrganizationPrefix}{organization}";
                    var blobPath = $"{BlobConstants.BatchPrefix}{batch}/{file.FileName}";
                    await _storageService.UploadToBlob(ms, containerName, blobPath);
                }
                else
                {
                    return new ResponseModel
                    {
                        Status = "ERROR",
                        Message = $"[{file.FileName}]: Invalid document content! Make sure the document contains data and is among the accepted formats: {BlobConstants.AcceptedDocumentFormats}"
                    };
                }
            }
            catch
            {
                return new ResponseModel
                {
                    Status = "ERROR",
                    Message = $"[{file.FileName}]: Error uploading document"
                };
            }

            return new ResponseModel
            {
                Status = "SUCCESS",
                Message = $"[{file.FileName}]: Successfully uploaded document to blob ({(file.Length / 1048576.0):0.00} MB)"
            };
        }

        private async Task<ResponseModel> DeleteDocument(string containerName, string blobPath, string fileName)
        {
            try
            {
                // Delete blob
                await _storageService.DeleteBlob(containerName, blobPath + fileName);

                return new ResponseModel
                {
                    Status = "SUCCESS",
                    Message = $"[{fileName}]: Successfully deleted document"
                };
            }
            catch
            {
                return new ResponseModel
                {
                    Status = "ERROR",
                    Message = $"[{fileName}]: Error deleting document"
                };
            }
        }
    }
}

