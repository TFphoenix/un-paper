﻿using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;
using Newtonsoft.Json;
using UNpaper.AzureFunctions.Common;

namespace UNpaper.AzureFunctions.Models
{
    public class BatchModel
    {
        [JsonRequired]
        [JsonPropertyName("id")]
        public string Id { get; set; }

        [JsonPropertyName("name")]
        public string Name { get; set; }

        [JsonPropertyName("description")]
        public string Description { get; set; }

        [JsonPropertyName("version")]
        public string Version { get; set; } = BlobConstants.DefaultMetadataVersion;

        [JsonRequired]
        [JsonPropertyName("organizationId")]
        public string OrganizationId { get; set; }

        [JsonPropertyName("organizationName")]
        public string OrganizationName { get; set; }
    }
}
