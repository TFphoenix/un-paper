using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using UNpaper.Registry.Model.Entities;

namespace UNpaper.Registry.Interface.Services
{
    public interface IUserService
    {
        Task<User> GetLoggedInUser(ClaimsPrincipal userClaims);
        Task<User> RegisterUser(ClaimsPrincipal userClaims);
    }
}
