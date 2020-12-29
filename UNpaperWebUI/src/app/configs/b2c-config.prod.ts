import { BrowserCacheLocation } from '@azure/msal-browser';

/**
 * B2C POLICIES CONFIG//TODO
 */
export const b2cPolicies = {
  names: {
    signUpSignIn: '',
    forgotPassword: '',
    editProfile: ''
  },
  authorities: {
    signUpSignIn: {
      authority: ''
    },
    forgotPassword: {
      authority: ''
    },
    editProfile: {
      authority: ''
    }
  },
  authorityDomain: ''
};

/**
 * B2C API CONFIG//TODO
 */
export const apiConfig: { scopes: string[]; uri: string } = {
  scopes: [''],
  uri: ''
};

/**
 * B2C IE CONFIG
 */
const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;

/**
 * B2C APP CONFIG//TODO
 */
export const appConfig = {
  auth: {
    clientId: '',
    authority: b2cPolicies.authorities.signUpSignIn.authority,
    redirectUri: '',
    postLogoutRedirectUri: '',
    knownAuthorities: [b2cPolicies.authorityDomain]
  },
  cache: {
    cacheLocation: BrowserCacheLocation.LocalStorage,
    storeAuthStateInCookie: isIE // set to true for IE 11
  }
};
