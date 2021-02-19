using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using UNpaper.Registry.Model.Entities;
using UNpaper.Registry.Interface.Repositories;

namespace UNpaper.Registry.Data.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly UNpaperDbContext _context;
        private readonly DbSet<User> _users;

        public UserRepository(UNpaperDbContext context)
        {
            _context = context;
            _users = context.Users;
        }

        public int Add(User user)
        {
            _users.Add(user);

            return _context.SaveChanges();
        }

        public async Task<int> AddAsync(User user)
        {
            await _users.AddAsync(user);

            return await _context.SaveChangesAsync();
        }

        public IQueryable<User> GetAsQueryable()
        {
            return _users;
        }

        public async Task<User> GetAsync(Guid id)
        {
            return await _users
                .Where(x => x.IsDeleted == false)
                .SingleOrDefaultAsync(x => x.Id == id);
        }
    }
}
