using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UNpaper.Registry.Interface.Entities;

namespace UNpaper.Registry.Interface.Repositories
{
    public interface IUserRepository : IRepository
    {
        void Add(User user);
        Task<User> GetAsync(Guid id);
    }
}
