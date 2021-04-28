using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace UNpaper.Registry.API.Parameters
{
    public static class ResponseMessages
    {
        public enum ResponseStatus
        {
            Success,
            Error,
            Other
        }

        public class Response
        {
            public ResponseStatus Status { get; set; } = ResponseStatus.Other;
            public string Message { get; set; } = "No Message";
        }

        // Errors
        public const string OrganizationNotFoundError = "Organization not found, make sure the given ID is correct and organization is not deleted";
        public const string OrganizationCreateError = "Error creating organization";
        public const string OrganizationUpdateError = "Error updating organization";
        public const string BatchNotFoundError = "Batch not found, make sure the given ID is correct and batch is not deleted";
        public const string BatchCreateError = "Error creating batch";
        public const string BatchUpdateError = "Error updating batch";

        // Succes
        public const string OrganizationUpdateSuccess = "Successfuly updated organization";
        public const string OrganizationDeleteSuccess = "Successfuly deleted organization";
        public const string BatchUpdateSuccess = "Successfuly updated batch";
        public const string BatchDeleteSuccess = "Successfuly deleted batch";
    }
}
