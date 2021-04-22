using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using UNpaper.Registry.Interface.Services;
using UNpaper.Registry.Model.Entities;

namespace UNpaper.Registry.Business.Services
{
    public class OrganizationService : IOrganizationService
    {
        public Task<Organization> GetUserOrganizations(ClaimsPrincipal userClaims)
        {
            throw new NotImplementedException();
        }

        public Task<Organization> CreateOrganization(Organization organization)
        {
            throw new NotImplementedException();
        }

        public Task<Organization> ModifyOrganization(Guid organizationId, Organization organization)
        {
            throw new NotImplementedException();
        }

        public Task<bool> DeleteOrganization(Guid organizationId)
        {
            throw new NotImplementedException();
        }
    }
}
