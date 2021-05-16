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

        [JsonRequired]
        [JsonPropertyName("length")]
        public long Length { get; set; }

        [JsonRequired]
        [JsonPropertyName("contentType")]
        public string ContentType { get; set; }

        [JsonRequired]
        [JsonPropertyName("date")]
        public DateTime Date { get; set; }

        [JsonPropertyName("blobPath")]
        public string BlobPath { get; set; }
    }
}
