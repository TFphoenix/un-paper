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
    public class BatchRepository : IBatchRepository
    {
        private readonly UNpaperDbContext _context;
        private readonly DbSet<Batch> _batches;

        public BatchRepository(UNpaperDbContext context)
        {
            _context = context;
            _batches = context.Batches;
        }

        public int Add(Batch batch)
        {
            _batches.Add(batch);

            return _context.SaveChanges();
        }

        public async Task<int> AddAsync(Batch batch)
        {
            await _batches.AddAsync(batch);

            return await _context.SaveChangesAsync();
        }

        public IQueryable<Batch> GetAsQueryable()
        {
            return _batches;
        }

        public async Task<Batch> GetAsync(Guid id)
        {
            return await _batches
                .Where(x => x.IsDeleted == false)
                .SingleOrDefaultAsync(x => x.Id == id);
        }

        public async Task<int> SaveAsync()
        {
            return await _context.SaveChangesAsync();
        }

        public async Task<Batch> AddAsyncEntity(Batch batch)
        {
            var createdBatch = await _batches.AddAsync(batch);

            var created = await _context.SaveChangesAsync();

            return createdBatch.Entity;
        }

        public IQueryable<Batch> GetUserBatchesAsQueryable(User user, bool includeOrganization)
        {
            if (includeOrganization)
            {
                var batches = _context.OrganizationUsers
                    .Include(ou => ou.Organization.Batches)
                    .ThenInclude(b => b.Organization)
                    .Where(ou => ou.User.Equals(user) &&
                                 ou.User.IsDeleted == false &&
                                 ou.Organization.IsDeleted == false)
                    .SelectMany(ou => ou.Organization.Batches
                        .Where(b => b.IsDeleted == false));

                // To prevent parsing errors because of cyclic dependencies
                foreach (var batch in batches)
                {
                    batch.Organization.Batches = new List<Batch>();
                }

                return batches;
            }

            return _context.OrganizationUsers
                    .Include(ou => ou.Organization.Batches)
                    .Where(ou => ou.User.Equals(user) &&
                                 ou.User.IsDeleted == false &&
                                 ou.Organization.IsDeleted == false)
                    .SelectMany(ou => ou.Organization.Batches
                        .Where(b => b.IsDeleted == false));
        }
    }
}
