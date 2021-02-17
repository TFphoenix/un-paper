using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using UNpaper.Registry.Data;

namespace UNpaper.Registry.API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
            //BuildHost(args).Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });

        //private static IHost BuildHost(string[] args)
        //{
        //    IHost host = CreateHostBuilder(args).Build();

        //    UpdateDatabase(host.Services);

        //    return host;
        //}

        //private static void UpdateDatabase(IServiceProvider serviceProvider)
        //{
        //    using (IServiceScope scope = serviceProvider.CreateScope())
        //    {
        //        UNpaperDbContext dbc = scope.ServiceProvider.GetRequiredService<UNpaperDbContext>();
        //        dbc.Database.Migrate();
        //    }
        //}
    }
}
