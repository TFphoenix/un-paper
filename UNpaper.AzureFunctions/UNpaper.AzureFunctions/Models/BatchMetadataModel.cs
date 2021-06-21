using System;
using System.Collections.Generic;
using System.Text;

namespace UNpaper.AzureFunctions.Models
{
    public class BatchMetadataModel
    {
        public class ProviderOptionsModel
        {
            public string Sas { get; set; }
        }

        public class SourceConnectionModel
        {
            public ProviderOptionsModel ProviderOptions { get; set; }
            public string Id { get; set; }
            public string Name { get; set; }
            public string ProviderType { get; set; }
        }

        public SourceConnectionModel SourceConnection { get; set; }
        public object ApiKey { get; set; }
        public string Name { get; set; }
        public string FolderPath { get; set; }
        public string ApiUriBase { get; set; }
        public string SecurityToken { get; set; }
        public string Version { get; set; }
        public string Id { get; set; }
        public List<object> Tags { get; set; }
    }
}
