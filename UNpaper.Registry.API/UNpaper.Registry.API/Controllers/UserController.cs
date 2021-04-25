using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Formatters;
using Microsoft.Extensions.Logging;
using Microsoft.Identity.Web.Resource;
using UNpaper.Registry.API.Parameters;
using UNpaper.Registry.Interface.Repositories;
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

        public UserController(ILogger<UserController> logger, IUserService userService, IOrganizationService organizationService)
        {
            _logger = logger;
            _userService = userService;
            _organizationService = organizationService;
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

            return batches.HasValue?
                await _organizationService.GetUserOrganizations(User, batches.Value):
                await _organizationService.GetUserOrganizations(User);
        }
    }
}
