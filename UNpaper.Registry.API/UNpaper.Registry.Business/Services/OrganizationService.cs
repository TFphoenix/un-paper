using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using UNpaper.Registry.Interface.Repositories;
using UNpaper.Registry.Interface.Services;
using UNpaper.Registry.Model.Entities;

namespace UNpaper.Registry.Business.Services
{
    public class OrganizationService : IOrganizationService
    {
        private readonly IOrganizationRepository _organizationRepository;

        private readonly IUserService _userService;

        public OrganizationService(IOrganizationRepository organizationRepository, IUserService userService)
        {
            _organizationRepository = organizationRepository;
            _userService = userService;
        }

        public async Task<List<Organization>> GetUserOrganizations(ClaimsPrincipal userClaims, bool includeBatches)
        {
            var user = await _userService.GetLoggedInUser(userClaims);
            return _organizationRepository.GetUserOrganizationsAsQueryable(user, includeBatches).ToList();
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
