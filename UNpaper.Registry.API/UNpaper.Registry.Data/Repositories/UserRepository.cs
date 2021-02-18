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

        public void Add(User user)
        {
            _users.Add(user);

            _context.SaveChanges();
        }

        public IQueryable<User> GetAsQueryable()
        {
            return _users;
        }

        public async Task<User> GetAsync(Guid id)
        {
            throw new NotImplementedException();
        }
    }
}
