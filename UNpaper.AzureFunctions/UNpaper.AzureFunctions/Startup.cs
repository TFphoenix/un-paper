using Microsoft.Azure.Functions.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using UNpaper.AzureFunctions.Models;

[assembly: FunctionsStartup(typeof(UNpaper.AzureFunctions.Startup))]
namespace UNpaper.AzureFunctions
{
    public class Startup : FunctionsStartup
    {
        public override void Configure(IFunctionsHostBuilder builder)
        {
            // Register settings
            builder.Services.AddOptions<CredentialsModel.FormRecognizerCredentials>()
                .Configure<IConfiguration>((formRecognizerCredentials, configuration) =>
                {
                    configuration.GetSection("FormRecognizer").Bind(formRecognizerCredentials);
                });

            // Register services
            //builder.Services.AddSingleton<IMyService>((s) => {
            //    return new MyService();
            //});
        }
    }
}
