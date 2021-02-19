import { EntityBaseRequest } from './entity-base-request.model';
import { SignInTokenClaims } from './sign-in-token-claims.model';
import { SignUpTokenClaims } from './sign-up-token-claims.model';

export class UserRequest extends EntityBaseRequest {
  country: string;
  email: string;
  name: string;
  postalCode: string;

  firstName?: string;
  lastName?: string;
  city?: string;
  state?: string;
  streetAddress?: string;

  constructor(tokenClaims: SignUpTokenClaims | SignInTokenClaims) {
    super();
    this.id = tokenClaims.userId;
    this.country = tokenClaims.userCountry;
    this.email = tokenClaims.userEmails[0];
    this.name = tokenClaims.userName;
    this.postalCode = tokenClaims.userPostalCode;

    if (this.isSignUpTokenClaims(tokenClaims)) {
      this.firstName = tokenClaims.userGivenName;
      this.lastName = tokenClaims.userFamilyName;
      this.city = tokenClaims.userCity;
      this.state = tokenClaims.userState;
      this.streetAddress = tokenClaims.userStreetAddress;
    }
  }

  private isSignUpTokenClaims(tokenClaims: SignUpTokenClaims | SignInTokenClaims): tokenClaims is SignUpTokenClaims {
    return <SignUpTokenClaims>tokenClaims !== undefined;
  }
}
