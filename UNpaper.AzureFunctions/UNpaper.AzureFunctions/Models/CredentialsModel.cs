using Newtonsoft.Json;

namespace UNpaper.AzureFunctions.Models
{
    public class CredentialsModel
    {
        public FormRecognizerCredentials FormRecognizer { get; set; }

        public class FormRecognizerCredentials
        {
            [JsonProperty("serviceURI")]
            public string ServiceUri { get; set; }

            [JsonProperty("apiKey")]
            public string ApiKey { get; set; }
        }
    }
}
