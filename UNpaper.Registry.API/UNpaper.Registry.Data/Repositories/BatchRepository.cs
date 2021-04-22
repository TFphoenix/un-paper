﻿using System;
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
    }
}
