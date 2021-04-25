using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Logging;
using Microsoft.Identity.Web.Resource;
using UNpaper.Registry.API.Parameters;
using UNpaper.Registry.Interface.Services;
using UNpaper.Registry.Model.Entities;

namespace UNpaper.Registry.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route(Routes.OrganizationRoute)]
    public class OrganizationController : ControllerBase
    {
        private readonly ILogger<OrganizationController> _logger;
        private readonly IOrganizationService _organizationService;

        public OrganizationController(ILogger<OrganizationController> logger, IOrganizationService organizationService)
        {
            _logger = logger;
            _organizationService = organizationService;
        }

        [HttpPost]
        public async Task<IActionResult> Create(Organization organization)
        {
            HttpContext.VerifyUserHasAnyAcceptedScope(Scopes.WriteScope);

            try
            {
                var createdOrganization = await _organizationService.CreateOrganization(organization, User);
                return (IActionResult)Ok(createdOrganization);
            }
            catch
            {
                return BadRequest(ResponseMessages.OrganizationCreateError);
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Read(string id)
        {
            HttpContext.VerifyUserHasAnyAcceptedScope(Scopes.ReadScope);

            var organization = await _organizationService.GetOrganization(new Guid(id));

            return organization != null
                ? (IActionResult)Ok(organization)
                : NotFound(ResponseMessages.OrganizationNotFoundError);
        }

        [HttpPut]
        public async Task<IActionResult> Update(Organization organization)
        {
            HttpContext.VerifyUserHasAnyAcceptedScope(Scopes.ReadWriteScope);

            try
            {
                var updated = await _organizationService.ModifyOrganization(organization);
                return updated
                    ? (IActionResult)Ok(ResponseMessages.OrganizationUpdateSuccess)
                    : NotFound(ResponseMessages.OrganizationNotFoundError);
            }
            catch
            {
                return BadRequest(ResponseMessages.OrganizationUpdateError);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            HttpContext.VerifyUserHasAnyAcceptedScope(Scopes.ReadWriteScope);

            var deleted = await _organizationService.DeleteOrganization(new Guid(id));

            return deleted ?
                (IActionResult)Ok(ResponseMessages.OrganizationDeleteSuccess) :
                NotFound(ResponseMessages.OrganizationNotFoundError);
        }
    }
}
