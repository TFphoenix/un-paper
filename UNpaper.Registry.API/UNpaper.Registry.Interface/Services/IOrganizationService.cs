using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using UNpaper.Registry.Model.Entities;

namespace UNpaper.Registry.Interface.Services
{
    public interface IOrganizationService
    {
        Task<Organization> GetUserOrganizations(ClaimsPrincipal userClaims);
        Task<Organization> CreateOrganization(Organization organization);
        Task<Organization> ModifyOrganization(Guid organizationId, Organization organization);
        Task<bool> DeleteOrganization(Guid organizationId);
    }
}
