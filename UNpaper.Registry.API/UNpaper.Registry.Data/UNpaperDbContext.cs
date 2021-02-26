﻿using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using UNpaper.Registry.Model.Entities;

namespace UNpaper.Registry.Data
{
    public class UNpaperDbContext : DbContext
    {
        // DbSets
        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }

        // Other
        private const string TABLE_NAME_PREFIX = "UNp_";

        // Ctor
        public UNpaperDbContext(DbContextOptions<UNpaperDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Add tables prefix
            foreach (IMutableEntityType entityType in modelBuilder.Model.GetEntityTypes())
            {
                string tableName = entityType.GetTableName();

                if (!tableName.StartsWith(TABLE_NAME_PREFIX))
                {
                    entityType.SetTableName(TABLE_NAME_PREFIX + entityType.DisplayName());
                }
            }
        }
    }
}