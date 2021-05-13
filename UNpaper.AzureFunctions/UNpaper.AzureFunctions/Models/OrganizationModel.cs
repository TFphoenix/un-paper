using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;
using Newtonsoft.Json;

namespace UNpaper.AzureFunctions.Models
{
    public class OrganizationModel
    {
        [JsonRequired]
        [JsonPropertyName("id")]
        public string Id { get; set; }

        [JsonPropertyName("name")]
        public string Name { get; set; }

        [JsonPropertyName("description")]
        public string Description { get; set; }

        [JsonPropertyName("foundationDate")]
        public string FoundationDate { get; set; }

        [JsonPropertyName("identificationCode")]
        public string IdentificationCode { get; set; }
    }
}
