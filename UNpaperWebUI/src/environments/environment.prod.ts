export const environment = {
  production: true,
  formRecognizer: {
    serviceURI: 'https://unpaper-form-recognizer.cognitiveservices.azure.com/',
    apiKey: '04c151ae65344c4fb1df1c59e1d22f47'
  },
  apimSubscriptionKey: '52a65edcbefd49bd8d478da6b90fbcce',
  services: {
    registryApi: {
      uri: 'https://unpaper-api-management-service.azure-api.net/v1',
      scopes: ['https://unpaper2020.onmicrosoft.com/api/demo.read', 'https://unpaper2020.onmicrosoft.com/api/demo.write']
    },
    functionsApi: {
      uri: 'https://unpaper-api-management-service.azure-api.net/unpaper-functions',
      scopes: [] // BUG: Can't add scopes from multiple sources
    }
  }
};
