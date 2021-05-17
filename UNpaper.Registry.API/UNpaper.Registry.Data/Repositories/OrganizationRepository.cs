using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using UNpaper.Registry.Interface.Repositories;
using UNpaper.Registry.Model.Entities;

namespace UNpaper.Registry.Data.Repositories
{
    public class OrganizationRepository : IOrganizationRepository
    {
        private readonly UNpaperDbContext _context;
        private readonly DbSet<Organization> _organizations;

        public OrganizationRepository(UNpaperDbContext context)
        {
            _context = context;
            _organizations = context.Organizations;
        }

        public int Add(Organization organization)
        {
            _organizations.Add(organization);

            return _context.SaveChanges();
        }

        public async Task<int> AddAsync(Organization organization)
        {
            await _organizations.AddAsync(organization);

            return await _context.SaveChangesAsync();
        }

        public IQueryable<Organization> GetAsQueryable()
        {
            return _organizations;
        }

        public async Task<Organization> GetAsync(Guid id)
        {
            return await _organizations
                .Where(x => x.IsDeleted == false)
                .SingleOrDefaultAsync(x => x.Id == id);
        }

        public async Task<int> SaveAsync()
        {
            return await _context.SaveChangesAsync();
        }

        public async Task<Organization> AddAsyncEntity(Organization organization)
        {
            var createdOrganization = await _organizations.AddAsync(organization);

            var created = await _context.SaveChangesAsync();

            return createdOrganization.Entity;
        }

        public IQueryable<Organization> GetUserOrganizationsAsQueryable(User user, bool includeBatches)
        {
            var organizations = _context.OrganizationUsers
                .Where(ou => ou.User.Equals(user) &&
                             ou.User.IsDeleted == false &&
                             ou.Organization.IsDeleted == false);

            if (includeBatches)
            {
                var result = organizations
                    .Include(ou => ou.Organization.Batches
                        .Where(b => b.IsDeleted == false))
                    .Select(ou => ou.Organization);

                // To prevent parsing errors because of cyclic dependencies
                foreach (var organization in result)
                {
                    foreach (var batch in organization.Batches)
                    {
                        batch.Organization = null;
                    }
                }

                return result;
            }

            return organizations.Select(ou => ou.Organization);
        }
    }
}
