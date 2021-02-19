using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UNpaper.Registry.Model.Entities;

namespace UNpaper.Registry.Interface.Repositories
{
    public interface IUserRepository : IRepository
    {
        int Add(User user);
        Task<int> AddAsync(User user);
        IQueryable<User> GetAsQueryable();
        Task<User> GetAsync(Guid id);
    }
}
