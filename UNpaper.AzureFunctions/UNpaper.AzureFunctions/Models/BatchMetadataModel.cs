using System;
using System.Collections.Generic;
using System.Text;
using UNpaper.AzureFunctions.Common;

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

        public class Tag
        {
            public string Name { get; set; }
            public string Color { get; set; }
            public string Type { get; set; }
            public string Format { get; set; }
            public int DocumentCount { get; set; }
        }

        public class Asset
        {
            public string Id { get; set; }
            public string Format { get; set; }
            public int State { get; set; }
            public int Type { get; set; }
            public string Name { get; set; }
            public string Path { get; set; }
            public object Size { get; set; }
            public string MimeType { get; set; }
            public int LabelingState { get; set; }
        }

        public class ModelInfo
        {
            public string ModelId { get; set; }
            public DateTime CreatedDateTime { get; set; }
            public string ModelName { get; set; }
            public bool IsComposed { get; set; }
        }

        public class RecentModelRecord
        {
            public ModelInfo ModelInfo { get; set; }
            public float AverageAccuracy { get; set; }
            public object Accuracies { get; set; }
            public bool IsComposed { get; set; }
        }

        public class TrainRecordModel
        {
            public ModelInfo ModelInfo { get; set; }
            public float AverageAccuracy { get; set; }
            public object Accuracies { get; set; }
        }

        public SourceConnectionModel SourceConnection { get; set; }
        public object ApiKey { get; set; }
        public string ApiVersion { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string FolderPath { get; set; }
        public string ApiUriBase { get; set; }
        public string SecurityToken { get; set; }
        public string Version { get; set; } = BlobConstants.DefaultMetadataVersion;
        public string Id { get; set; }
        public List<Tag> Tags { get; set; }
        public object Assets { get; set; }
        public string LastVisitedAssetId { get; set; }
        public List<RecentModelRecord> RecentModelRecords { get; set; }
        public TrainRecordModel TrainRecord { get; set; }
        public string PredictModelId { get; set; }
    }
}
