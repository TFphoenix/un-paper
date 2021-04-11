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
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<User> GetLoggedInUser(ClaimsPrincipal userClaims)
        {
            var id = userClaims.FindFirst(Constants.OidUserClaimType).Value;
            return await _userRepository.GetAsync(new Guid(id));
        }

        public async Task<User> RegisterUser(ClaimsPrincipal userClaims)
        {
            var user = new User()
            {
                Id = new Guid(userClaims.FindFirst(Constants.OidUserClaimType).Value),
                Email = userClaims.FindFirst(Constants.EmailUserClaimType).Value,
                FirstName = userClaims.FindFirst(Constants.GivenNameUserClaimType).Value,// given name
                LastName = userClaims.FindFirst(Constants.FamilyNameUserClaimType).Value,// family name
                Name = userClaims.FindFirst(Constants.DisplayNameUserClaimType).Value,// display name
                City = userClaims.FindFirst(Constants.CityUserClaimType).Value,
                Country = userClaims.FindFirst(Constants.CountryUserClaimType).Value,
                PostalCode = userClaims.FindFirst(Constants.PostalCodeUserClaimType).Value,
                State = userClaims.FindFirst(Constants.StateUserClaimType).Value,
                StreetAddress = userClaims.FindFirst(Constants.StreetAddressUserClaimType).Value
            };

            int changes = await _userRepository.AddAsync(user);

            return changes != 0 ? user : null;
        }
    }
}
