using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using UNpaper.AzureFunctions.Models;

namespace UNpaper.AzureFunctions.HttpFunctions
{
    public class CredentialsFunction
    {
        private readonly CredentialsModel.FormRecognizerCredentials _formRecognizerCredentials;

        public CredentialsFunction(IOptions<CredentialsModel.FormRecognizerCredentials> formRecognizerCredentials)
        {
            _formRecognizerCredentials = formRecognizerCredentials.Value;
        }

        [FunctionName("Credentials")]
        public IActionResult GetCredentials(
            [HttpTrigger(AuthorizationLevel.Function, "get", Route = null)] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");

            var credentials = new CredentialsModel()
            {
                FormRecognizer = _formRecognizerCredentials
            };

            return new OkObjectResult(credentials);
        }
    }
}

