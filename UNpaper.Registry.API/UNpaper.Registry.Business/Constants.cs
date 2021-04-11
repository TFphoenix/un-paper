using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UNpaper.Registry.Business
{
    public static class Constants
    {
        // User Claim Types
        public const string OidUserClaimType = "http://schemas.microsoft.com/identity/claims/objectidentifier";
        public const string EmailUserClaimType = "emails";
        public const string CityUserClaimType = "city";
        public const string CountryUserClaimType = "country";
        public const string DisplayNameUserClaimType = "name";
        public const string GivenNameUserClaimType = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname";
        public const string FamilyNameUserClaimType = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname";
        public const string PostalCodeUserClaimType = "postalCode";
        public const string StateUserClaimType = "state";
        public const string StreetAddressUserClaimType = "streetAddress";
    }
}
