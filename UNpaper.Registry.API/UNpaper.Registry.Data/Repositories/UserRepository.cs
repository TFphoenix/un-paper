using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using UNpaper.Registry.Interface.Entities;
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

            _users = context.Set<User>();
        }

        public void Add(User user)
        {
            _users.Add(user);

            _context.SaveChanges();
        }

        public Task<User> GetAsync(Guid id)
        {
            throw new NotImplementedException();
        }
    }
}
