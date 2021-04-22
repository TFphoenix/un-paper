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
        private readonly IBatchRepository _batchRepository;

        private readonly IUserService _userService;

        public OrganizationService(IOrganizationRepository organizationRepository, IUserService userService, IBatchRepository batchRepository)
        {
            _organizationRepository = organizationRepository;
            _userService = userService;
            _batchRepository = batchRepository;
        }

        public async Task<List<Organization>> GetUserOrganizations(ClaimsPrincipal userClaims, bool includeBatches)
        {
            var user = await _userService.GetLoggedInUser(userClaims);
            return _organizationRepository.GetUserOrganizationsAsQueryable(user, includeBatches).ToList();
        }

        public async Task<Organization> GetOrganization(Guid id)
        {
            return await _organizationRepository.GetAsync(id);
        }

        public async Task<Organization> CreateOrganization(Organization organization, ClaimsPrincipal userClaims)
        {
            var user = await _userService.GetLoggedInUser(userClaims);

            organization.OrganizationUsers.Add(new OrganizationUser()
            {
                Organization = organization,
                User = user
            });

            var createdOrganization = await _organizationRepository.AddAsyncEntity(organization);

            // For avoinding depenency cycle exception
            createdOrganization.OrganizationUsers = new List<OrganizationUser>();

            return createdOrganization;
        }

        public async Task<bool> ModifyOrganization(Organization organization)
        {
            var oldOrganization = await _organizationRepository.GetAsync(organization.Id);

            if (oldOrganization == null)
            {
                return false;
            }

            oldOrganization.Name = organization.Name;
            oldOrganization.Description = organization.Description;
            oldOrganization.FoundationDate = organization.FoundationDate;
            oldOrganization.IdentificationCode = organization.IdentificationCode;

            return await _organizationRepository.SaveAsync() > 0;
        }

        public async Task<bool> DeleteOrganization(Guid id)
        {
            var organization = await _organizationRepository.GetAsync(id);

            if (organization == null)
            {
                return false;
            }

            organization.IsDeleted = true;
            foreach (var batch in
                _batchRepository.GetAsQueryable()
                    .Where(b => b.OrganizationId == id))
            {
                batch.IsDeleted = true;
            }

            return await _organizationRepository.SaveAsync() > 0;
        }
    }
}
