export interface TokenClaims {
  // general
  aud: string; // An audience claim identifies the intended recipient of the token. For Azure AD B2C, the audience is your app's Application ID, as assigned to your app in the app registration portal. Your app should validate this value and reject the token if it does not match.
  exp: number; // The expiration time claim is the time at which the token becomes invalid, represented in epoch time. Your app should use this claim to verify the validity of the token lifetime.
  iat: number; // The time at which the token was issued, represented in epoch time.
  iis: string; // This claim identifies the security token service (STS) that constructs and returns the token. It also identifies the Azure AD directory in which the user was authenticated. Your app should validate the issuer claim to ensure that the token came from the v2.0 endpoint. It also should use the GUID portion of the claim to restrict the set of tenants that can sign in to the app.
  nbf: number; // This claim is the time at which the token becomes valid, represented in epoch time. This is usually the same as the time the token was issued. Your app should use this claim to verify the validity of the token lifetime.
  nonce: string; // A nonce is a strategy used to mitigate token replay attacks. Your app can specify a nonce in an authorization request by using the nonce query parameter. The value you provide in the request will be emitted unmodified in the nonce claim of an ID token only. This allows your app to verify the value against the value it specified on the request, which associates the app's session with a given ID token. Your app should perform this validation during the ID token validation process.
  sub: string; // This is the principal about which the token asserts information, such as the user of an app. This value is immutable and cannot be reassigned or reused. It can be used to perform authorization checks safely, such as when the token is used to access a resource. By default, the subject claim is populated with the object ID of the user in the directory. To learn more, see Azure Active Directory B2C: Token, session, and single sign-on configuration.
  tfp: string; // This is the name of the policy that was used to acquire the token.
  ver: string; // The version of the ID token, as defined by Azure AD B2C.

  // authentication
  auth_time: number; // This claim is the time at which a user last entered credentials, represented in epoch time.
  newUser: boolean; // True if the user is registered during the authentication request that generated the token, false otherwise.
  oid: string; // The immutable identifier for the user account in the tenant. It can be used to perform authorization checks safely and as a key in database tables. This ID uniquely identifies the user across applications - two different applications signing in the same user will receive the same value in the oid claim. This means that it can be used when making queries to Microsoft online services, such as the Microsoft Graph. The Microsoft Graph will return this ID as the id property for a given user account.

  // user info
  city: string; // The city in which the user is located.
  country: string; // The country in which the user is located.
  emails: string[]; // Email addresses of the user. These are mutable and might change over time. Therefore, they are not suitable for identifying the user in other databases or applications. The oid or sub claim should be used instead.
  family_name: string; // The user's surname (also known as last name).
  given_name: string; // The user's given name (also known as first name).
  name: string; // The user's full name in displayable form including all name parts, possibly including titles and suffixes.
  postalCode: string; // The postal code of the user's address.
  state: string; // The state or province in which the user is located.
  streetAddress: string; // The street address where the user is located.
}
