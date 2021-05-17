using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace UNpaper.Registry.API.Parameters
{
    public static class Routes
    {
        // Decorators
        private const string API_PREFIX = "api/";
        private const string ACTION_SUFFIX = "/[action]";

        // Controller Routes
        public const string AuthRoute = API_PREFIX + "user" + ACTION_SUFFIX;
        public const string OrganizationsRoute = API_PREFIX + "organizations";
        public const string BatchesRoute = API_PREFIX + "batches";

        // Action Routes
        public const string UserAuthAction = "auth";
        public const string UserOrganizationsAction = "organizations";
        public const string UserBatchesAction = "batches";
    }
}
