using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using UNpaper.Registry.Data.Repositories;
using UNpaper.Registry.Interface.Repositories;

namespace UNpaper.Registry.Data
{
    public static class BootstrapData
    {
        public static IServiceCollection ConfigureApplicationData(this IServiceCollection services,
            IConfiguration configuration, bool isDevEnv)
        {
            if (isDevEnv)
            {
                services.AddDbContext<UNpaperDbContext>(optionsAction =>
                    optionsAction.UseSqlServer(configuration.GetConnectionString("MsSql"))
                        .EnableSensitiveDataLogging()
                );
            }
            else
            {
                services.AddDbContext<UNpaperDbContext>(optionsAction =>
                    optionsAction.UseSqlServer(configuration.GetConnectionString("MsSql"),
                        options => options.EnableRetryOnFailure())
                );
            }

            //AddRepositories(services);

            return services;
        }

        //private static void AddRepositories(this IServiceCollection services)
        //{
        //    services.AddScoped<IUserRepository, UserRepository>();
        //}
    }
}
