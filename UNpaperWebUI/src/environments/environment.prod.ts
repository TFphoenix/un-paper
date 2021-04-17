export const environment = {
  production: true,
  formRecognizer: {
    serviceURI: 'https://unpaper-form-recognizer.cognitiveservices.azure.com/',
    apiKey: '04c151ae65344c4fb1df1c59e1d22f47'
  },
  apimSubscriptionKey: '52a65edcbefd49bd8d478da6b90fbcce',
  b2cScopes: [
    'https://unpaper2020.onmicrosoft.com/api/demo.read',
    'https://unpaper2020.onmicrosoft.com/api/demo.write',
    'https://unpaper2020.onmicrosoft.com/api/functions.read',
    'https://unpaper2020.onmicrosoft.com/api/functions.write'
  ],
  services: {
    registryApi: 'https://unpaper-api-management-service.azure-api.net/v1',
    functionsApi: 'https://unpaper-api-management-service.azure-api.net/unpaper-functions'
  }
};
