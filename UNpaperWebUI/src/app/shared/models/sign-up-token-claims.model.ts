import { TokenClaims } from '../interfaces/token-claims.interface';

export class SignUpTokenClaims {
  userId: string;
  userCountry: string;
  userName: string;
  userPostalCode: string;
  userCity: string;
  userGivenName: string;
  userState: string;
  userStreetAddress: string;
  userFamilyName: string;

  constructor(tokenClaims: TokenClaims) {
    this.userId = tokenClaims.oid;
    this.userCountry = tokenClaims.country;
    this.userName = tokenClaims.name;
    this.userPostalCode = tokenClaims.postalCode;
    this.userCity = tokenClaims.city;
    this.userGivenName = tokenClaims.given_name;
    this.userState = tokenClaims.state;
    this.userStreetAddress = tokenClaims.streetAddress;
    this.userFamilyName = tokenClaims.family_name;
  }
}
