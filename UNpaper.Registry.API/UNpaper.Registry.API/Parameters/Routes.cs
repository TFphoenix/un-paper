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
        public const string AuthRoute = API_PREFIX + "auth" + ACTION_SUFFIX;

        // Action Routes
        public const string UserAction = "user";
    }
}
