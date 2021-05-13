using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;
using Newtonsoft.Json;

namespace UNpaper.AzureFunctions.Models
{
    public class BatchModel
    {
        [JsonRequired]
        [JsonPropertyName("id")]
        public string Id { get; set; }

        [JsonRequired]
        [JsonPropertyName("organizationId")]
        public string OrganizationId { get; set; }

        [JsonPropertyName("name")]
        public string Name { get; set; }

        [JsonPropertyName("description")]
        public string Description { get; set; }
    }
}
