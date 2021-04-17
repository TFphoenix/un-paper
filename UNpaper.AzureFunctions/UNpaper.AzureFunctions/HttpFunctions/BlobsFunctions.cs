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

namespace UNpaper.AzureFunctions.HttpFunctions
{
    public static class BlobsFunctions
    {
        [FunctionName("Blobs")]
        public static async Task<IActionResult> ListAllBlobs(
            [HttpTrigger(AuthorizationLevel.Function, "get", Route = null)] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");

            //string name = req.Query["name"];

            //string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            //dynamic data = JsonConvert.DeserializeObject(requestBody);
            //name = name ?? data?.name;

            //string responseMessage = string.IsNullOrEmpty(name)
            //    ? "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response."
            //    : $"Hello, {name}. This HTTP triggered function executed successfully.";

            return new OkObjectResult("List Blobs Function");
        }

        [FunctionName("BlobsUpload")]
        public static async Task<IActionResult> UploadDocument(
            [HttpTrigger(AuthorizationLevel.Function, "post", Route = null)] HttpRequest req,
            ILogger log)
        {
            throw new NotImplementedException();
        }

        [FunctionName("BlobsGet")]
        public static async Task<IActionResult> GetDocument(
            [HttpTrigger(AuthorizationLevel.Function, "get", Route = null)] HttpRequest req,
            ILogger log)
        {
            throw new NotImplementedException();
        }

        [FunctionName("BlobsDelete")]
        public static async Task<IActionResult> DeleteDocument(
            [HttpTrigger(AuthorizationLevel.Function, "delete", Route = null)] HttpRequest req,
            ILogger log)
        {
            throw new NotImplementedException();
        }

        [FunctionName("BlobsUpdate")]
        public static async Task<IActionResult> UpdateDocument(
            [HttpTrigger(AuthorizationLevel.Function, "put", Route = null)] HttpRequest req,
            ILogger log)
        {
            throw new NotImplementedException();
        }
    }
}

