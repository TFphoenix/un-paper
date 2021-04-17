// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  formRecognizer: {
    serviceURI: 'https://unpaper-form-recognizer.cognitiveservices.azure.com/',
    apiKey: '04c151ae65344c4fb1df1c59e1d22f47'
  },
  apimSubscriptionKey: '52a65edcbefd49bd8d478da6b90fbcce',
  services: {
    registryApi: {
      uri: 'https://localhost:44343', // TEST: Uncomment for testing purposes
      // uri: 'https://unpaper-api-management-service.azure-api.net/v1',
      scopes: ['https://unpaper2020.onmicrosoft.com/api/demo.read', 'https://unpaper2020.onmicrosoft.com/api/demo.write']
    },
    functionsApi: {
      uri: 'http://localhost:7071',
      scopes: [] // BUG: Can't add scopes from multiple sources
    }
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
