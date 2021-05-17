using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Identity.Web;
using UNpaper.Registry.API.Swagger;
using UNpaper.Registry.Business.Services;
using UNpaper.Registry.Data;
using UNpaper.Registry.Interface.Services;

namespace UNpaper.Registry.API
{
    public class Startup
    {
        public Startup(IConfiguration configuration, IWebHostEnvironment environment)
        {
            Configuration = configuration;
            Environment = environment;
        }

        public IConfiguration Configuration { get; }
        public IWebHostEnvironment Environment { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // Authentication configuration
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddMicrosoftIdentityWebApi(Configuration.GetSection("AzureAdB2C"));

            // API configuration
            services.AddControllers();

            // Swagger configuration
            services.AddSwaggerGen(c =>
            {
                // Version
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "UNpaper.Registry.API", Version = "v1" });

                // Authentication
                var authenticationCredentials = this.Configuration.GetSection("AzureAdB2C");
                var instance = authenticationCredentials.GetValue<string>("Instance");
                var url = instance.Remove(instance.Length - 4);
                var domain = authenticationCredentials.GetValue<string>("Domain");
                var signUpSignInPolicyId = authenticationCredentials.GetValue<string>("SignUpSignInPolicyId").ToLower();
                var clientId = authenticationCredentials.GetValue<string>("ServiceClientId");
                c.AddSecurityDefinition(
                    "Bearer",
                    new OpenApiSecurityScheme
                    {
                        In = ParameterLocation.Header,
                        Description = "Enter the authentication token recieved from the Azure AD B2C Instance" +
                                      "<br><a href=\"" +
                                      $"{url}{domain}/oauth2/v2.0/authorize?p={signUpSignInPolicyId}&client_id={clientId}&response_type=token&redirect_uri=https://jwt.ms&state=anything&nounce=12345&scope=https://{domain}/api/demo.read https://{domain}/api/demo.write https://{domain}/api/functions.read https://{domain}/api/functions.write&response_mode=fragment" +
                                      "\" target=\"_blank\">Click here to obtain the authentication token</a>",
                        Name = "Authorization",
                        Type = SecuritySchemeType.ApiKey,
                    });
                c.OperationFilter<SecurityRequirementsOperationFilter>();
            });

            // CORS configuration
            //TODO: Add specific CORS
            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                    builder => builder.AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader());
            });

            // Data configuration
            services.ConfigureApplicationData(Configuration, Environment.IsDevelopment());

            // Register services
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IOrganizationService, OrganizationService>();
            services.AddScoped<IBatchService, BatchService>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseCors("CorsPolicy");// use CORS policy

            // development environment configuration
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "UNpaper.Registry.API v1"));
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            // Authentication & authorization configuration
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
