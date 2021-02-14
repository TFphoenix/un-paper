import { TokenClaims } from '../interfaces/token-claims.interface';

export class SignInTokenClaims {
  userId: string;
  userCountry: string;
  userName: string;
  userPostalCode: string;

  constructor(tokenClaims: TokenClaims) {
    this.userId = tokenClaims.oid;
    this.userCountry = tokenClaims.country;
    this.userName = tokenClaims.name;
    this.userPostalCode = tokenClaims.postalCode;
  }
}
