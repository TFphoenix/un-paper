using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Identity.Web.Resource;
using System.Collections.Generic;
using System.Threading.Tasks;
using UNpaper.Registry.API.Parameters;
using UNpaper.Registry.Interface.Services;
using UNpaper.Registry.Model.Entities;

namespace UNpaper.Registry.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route(Routes.AuthRoute)]
    public class UserController : ControllerBase
    {
        private readonly ILogger<UserController> _logger;
        private readonly IUserService _userService;
        private readonly IOrganizationService _organizationService;
        private readonly IBatchService _batchService;

        public UserController(ILogger<UserController> logger, IUserService userService, IOrganizationService organizationService, IBatchService batchService)
        {
            _logger = logger;
            _userService = userService;
            _organizationService = organizationService;
            _batchService = batchService;
        }

        [HttpGet]
        [ActionName(Routes.UserAuthAction)]
        public async Task<User> LoginUser()
        {
            HttpContext.VerifyUserHasAnyAcceptedScope(Scopes.ReadScope);

            return await _userService.GetLoggedInUser(User);
        }

        [HttpPost]
        [ActionName(Routes.UserAuthAction)]
        public async Task<IActionResult> RegisterUser()
        {
            HttpContext.VerifyUserHasAnyAcceptedScope(Scopes.ReadWriteScope);

            try
            {
                User registeredUser = await _userService.RegisterUser(User);
                return Ok(new { message = "User succesfully registered", registeredUser = registeredUser });
            }
            catch
            {
                var alreadyRegisteredUser = await _userService.GetLoggedInUser(User);
                return StatusCode(409, new { message = "User already registered", registeredUser = alreadyRegisteredUser });
            }
        }

        [HttpGet]
        [ActionName(Routes.UserOrganizationsAction)]
        public async Task<IEnumerable<Organization>> GetUserOrganizations(bool? batches)
        {
            HttpContext.VerifyUserHasAnyAcceptedScope(Scopes.ReadScope);

            return batches.HasValue ?
                await _organizationService.GetUserOrganizations(User, batches.Value) :
                await _organizationService.GetUserOrganizations(User);
        }

        [HttpGet]
        [ActionName(Routes.UserBatchesAction)]
        public async Task<IEnumerable<Batch>> GetUserBatches(bool? organization)
        {
            HttpContext.VerifyUserHasAnyAcceptedScope(Scopes.ReadScope);

            return organization.HasValue ?
                await _batchService.GetUserBatches(User, organization.Value) :
                await _batchService.GetUserBatches(User);
        }
    }
}
