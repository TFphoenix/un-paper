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
        Task<List<Organization>> GetUserOrganizations(ClaimsPrincipal userClaims, bool includeBatches = false);
        Task<Organization> GetOrganization(Guid id);
        Task<Organization> CreateOrganization(Organization organization, ClaimsPrincipal userClaims);
        Task<bool> ModifyOrganization(Organization organization);
        Task<bool> DeleteOrganization(Guid id);
    }
}
