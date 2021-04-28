using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Identity.Web.Resource;
using System;
using System.Threading.Tasks;
using UNpaper.Registry.API.Parameters;
using UNpaper.Registry.Interface.Services;
using UNpaper.Registry.Model.Entities;

namespace UNpaper.Registry.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route(Routes.OrganizationsRoute)]
    public class OrganizationsController : ControllerBase
    {
        private readonly ILogger<OrganizationsController> _logger;
        private readonly IOrganizationService _organizationService;

        public OrganizationsController(ILogger<OrganizationsController> logger, IOrganizationService organizationService)
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
                    ? (IActionResult)Ok(new ResponseMessages.Response()
                    {
                        Status = ResponseMessages.ResponseStatus.Success,
                        Message = ResponseMessages.OrganizationUpdateSuccess
                    })
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
                (IActionResult)Ok(new ResponseMessages.Response()
                {
                    Status = ResponseMessages.ResponseStatus.Success,
                    Message = ResponseMessages.OrganizationDeleteSuccess
                }) :
                NotFound(ResponseMessages.OrganizationNotFoundError);
        }
    }
}
