﻿using System;
using Microsoft.Azure.Functions.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using UNpaper.AzureFunctions.Models;
using UNpaper.AzureFunctions.Services;

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
            builder.Services.AddSingleton<BlobStorageService>((provider) =>
            {
                var blobStorageConnectionString =
                    builder.GetContext().Configuration.GetConnectionString("AzureStorage");
                var formRecognizerSection = builder.GetContext().Configuration.GetSection("FormRecognizer");
                var formRecognizerCredentials = new CredentialsModel.FormRecognizerCredentials
                {
                    ApiKey = formRecognizerSection.GetSection("ApiKey").Value,
                    ServiceUri = formRecognizerSection.GetSection("ServiceUri").Value
                };

                return new BlobStorageService(blobStorageConnectionString, formRecognizerCredentials);
            });
        }
    }
}
