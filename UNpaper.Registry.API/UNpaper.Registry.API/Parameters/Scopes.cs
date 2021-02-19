using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace UNpaper.Registry.API.Parameters
{
    public static class Scopes
    {
        // Scope Names
        private const string READ_SCOPE = "demo.read";
        private const string WRITE_SCOPE = "demo.write";

        // Scope Types
        public static readonly string[] NoScope = { };
        public static readonly string[] ReadScope = { READ_SCOPE };
        public static readonly string[] WriteScope = { WRITE_SCOPE };
        public static readonly string[] ReadWriteScope = { READ_SCOPE, WRITE_SCOPE };
    }
}
