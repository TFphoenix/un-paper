using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;
using Newtonsoft.Json;

namespace UNpaper.AzureFunctions.Models
{
    public class DocumentModel
    {
        [JsonRequired]
        [JsonPropertyName("name")]
        public string Name { get; set; }

        [JsonPropertyName("blobPath")]
        public string BlobPath { get; set; }
    }
}
