using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Formatters;
using Microsoft.Extensions.Logging;
using Microsoft.Identity.Web.Resource;
using UNpaper.Registry.API.Parameters;
using UNpaper.Registry.Interface.Repositories;
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

        public AuthController(ILogger<AuthController> logger, IUserRepository userRepository)
        {
            _logger = logger;
            _userRepository = userRepository;
        }

        [HttpGet("{id}")]
        [ActionName(Routes.UserAction)]
        public async Task<User> GetUserById(string id)
        {
            HttpContext.VerifyUserHasAnyAcceptedScope(Scopes.ReadScope);

            return await _userRepository.GetAsync(new Guid(id));
        }

        [HttpPost]
        [ActionName(Routes.UserAction)]
        public async Task<IActionResult> RegisterUser(User user)
        {
            HttpContext.VerifyUserHasAnyAcceptedScope(Scopes.ReadWriteScope);

            int changes = await _userRepository.AddAsync(user);

            if (changes == 0)
            {
                return StatusCode(409, new { message = "User already registered", registeredUser = user });
            }

            return Ok(new { message = "User succesfully registered", registeredUser = user });
        }
    }
}
