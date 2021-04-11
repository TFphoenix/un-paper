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
    public class AuthController : ControllerBase
    {
        private readonly ILogger<AuthController> _logger;
        private readonly IUserRepository _userRepository;
        private readonly IUserService _userService;

        public AuthController(ILogger<AuthController> logger, IUserRepository userRepository, IUserService userService)
        {
            _logger = logger;
            _userRepository = userRepository;
            _userService = userService;
        }

        [HttpGet]
        [ActionName(Routes.UserAction)]
        public async Task<User> LoginUser()
        {
            HttpContext.VerifyUserHasAnyAcceptedScope(Scopes.ReadScope);

            return await _userService.GetLoggedInUser(User);
        }

        [HttpPost]
        [ActionName(Routes.UserAction)]
        public async Task<IActionResult> RegisterUser()
        {
            HttpContext.VerifyUserHasAnyAcceptedScope(Scopes.ReadWriteScope);

            User registeredUser = await _userService.RegisterUser(User);

            if (registeredUser == null)
            {
                var alreadyRegisteredUser = await _userService.GetLoggedInUser(User);
                return StatusCode(409, new { message = "User already registered", registeredUser = alreadyRegisteredUser });
            }

            return Ok(new { message = "User succesfully registered", registeredUser = registeredUser });
        }
    }
}
