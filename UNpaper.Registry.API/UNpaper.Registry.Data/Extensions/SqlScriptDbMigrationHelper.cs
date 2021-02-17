using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace UNpaper.Registry.Data.Extensions
{
    public static class DbContextExtensions
    {
        public static void ApplyEntityConfigurations(this DbContext dbContext, ModelBuilder modelBuilder)
        {
            Type entityTypeConfigurationType = typeof(IEntityTypeConfiguration<>);
            MethodInfo getTypedEntityBuilder = typeof(ModelBuilder)
                .GetMethods(BindingFlags.Instance | BindingFlags.Public)
                .First(x => x.Name == nameof(ModelBuilder.Entity) && x.IsGenericMethod);

            Type[] entityConfigurations = dbContext.GetType().Assembly.GetTypes().Where(x =>
                !x.IsAbstract &&
                x.IsClass &&
                x.GetInterfaces().Any(i => i.IsGenericType && i.GetGenericTypeDefinition() == entityTypeConfigurationType)
            ).ToArray();

            foreach (Type entityConfiguration in entityConfigurations)
            {
                // Find TEntity
                Type concreteConfigurationType = entityConfiguration.GetTypeInfo().ImplementedInterfaces
                    .Single(x => x.IsGenericType && x.GetGenericTypeDefinition() == entityTypeConfigurationType);
                Type entityType = concreteConfigurationType.GetGenericArguments()[0];

                // Find IEntityTypeConfiguration<TEntity>.Configure()
                MethodInfo methodInfo = concreteConfigurationType.GetMethod(nameof(IEntityTypeConfiguration<object>.Configure));

                // Create an instance of IEntityConfiguration<TEntity>
                object configurationInstance = Activator.CreateInstance(entityConfiguration);

                // Create an instance of EntityTypeBuilder<TEntity>
                object entityTypeBuilder = getTypedEntityBuilder.MakeGenericMethod(entityType).Invoke(modelBuilder, null);

                // And invoke Configure(EntityTypeBuilder<TEntity> builder)
                methodInfo?.Invoke(configurationInstance, new[] { entityTypeBuilder });
            }
        }
    }
}
