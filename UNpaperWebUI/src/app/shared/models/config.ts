import { B2CPolicy } from './b2c-policy';

export class Config {
  // B2C policies
  public B2CSignUpSignInPolicy: B2CPolicy;
  public B2CResetPasswordPolicy: B2CPolicy;
  public B2CEditProfilePolicy: B2CPolicy;

  // B2C configuration
  public B2CWebUiClientID: string;
  public B2CRedirectUri: string;
  public B2CPostLogoutRedirectUri: string;

  // APIs
  public registryAPI: string;
  public functionsAPI: string;
}
