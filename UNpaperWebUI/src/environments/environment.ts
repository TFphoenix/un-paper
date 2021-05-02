// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apimSubscriptionKey: '52a65edcbefd49bd8d478da6b90fbcce',
  b2cScopes: [
    'https://unpaper2020.onmicrosoft.com/api/demo.read',
    'https://unpaper2020.onmicrosoft.com/api/demo.write',
    'https://unpaper2020.onmicrosoft.com/api/functions.read',
    'https://unpaper2020.onmicrosoft.com/api/functions.write'
  ],
  services: {
    // registryApi: 'https://localhost:44343/api',
    registryApi: 'https://unpaper-api-management-service.azure-api.net/v1/api', // TEST: Uncomment for testing purposes
    // functionsApi: 'http://localhost:7071/api' // BUG: Fix CORS on localhost
    functionsApi: 'https://unpaper-api-management-service.azure-api.net/unpaper-functions' // TEST: Uncomment for testing purposes
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
