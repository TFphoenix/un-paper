import { BrowserCacheLocation } from '@azure/msal-browser';

/**
 * B2C POLICIES CONFIG
 */
export const b2cPolicies = {
  names: {
    signUpSignIn: 'B2C_1_signup_signin',
    forgotPassword: 'B2C_1_password_reset',
    editProfile: 'B2C_1_edit_profile'
  },
  authorities: {
    signUpSignIn: {
      authority: 'https://unpaper2020.b2clogin.com/unpaper2020.onmicrosoft.com/B2C_1_signup_signin'
    },
    forgotPassword: {
      authority: 'https://unpaper2020.b2clogin.com/unpaper2020.onmicrosoft.com/B2C_1_password_reset'
    },
    editProfile: {
      authority: 'https://unpaper2020.b2clogin.com/unpaper2020.onmicrosoft.com/B2C_1_edit_profile'
    }
  },
  authorityDomain: 'unpaper2020.b2clogin.com'
};

/**
 * B2C IE CONFIG
 */
const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;

/**
 * B2C APP CONFIG
 */
export const appConfig = {
  auth: {
    clientId: '955582f2-1f42-4be1-a73a-c1443f28034c',
    authority: b2cPolicies.authorities.signUpSignIn.authority,
    redirectUri: 'https://unpaper-webui.azurewebsites.net/auth-callback',
    postLogoutRedirectUri: 'https://unpaper-webui.azurewebsites.net/auth-callback',
    knownAuthorities: [b2cPolicies.authorityDomain]
  },
  cache: {
    cacheLocation: BrowserCacheLocation.LocalStorage,
    storeAuthStateInCookie: isIE // set to true for IE 11
  }
};
