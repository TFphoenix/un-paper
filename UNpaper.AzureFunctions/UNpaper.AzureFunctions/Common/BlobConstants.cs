using System;
using System.Collections.Generic;
using System.Text;

namespace UNpaper.AzureFunctions.Common
{
    public static class BlobConstants
    {
        // Prefixes
        public const string GeneralPrefix = "unpaper-";
        public const string OrganizationPrefix = GeneralPrefix + "org-";
        public const string BatchPrefix = GeneralPrefix + "bch-";
        public const string MetadataPrefix = "metadata-";

        // Accepted document formats
        public static readonly string[] AcceptedDocumentFormats = {
            "application/json", "application/pdf", "image/jpeg", "image/png", "image/tiff"
        };

        // Other
        public const string Delimiter = "/";
        public const string HiddenAttribute = "HIDDEN";
        public const string MetadataFileType = ".fott";
        public const int SasExpirationHours = 2;
    }
}
