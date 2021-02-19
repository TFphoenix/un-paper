import { Inject, Injectable } from '@angular/core';
import { MSAL_GUARD_CONFIG, MsalGuardConfiguration, MsalService, MsalBroadcastService } from '@azure/msal-angular';
import {
  RedirectRequest,
  PopupRequest,
  InteractionType,
  AuthenticationResult,
  AuthError,
  EventMessage,
  EventType
} from '@azure/msal-browser';
import { Observable, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { b2cPolicies } from 'src/app/configs/b2c-config';
import { TokenClaims } from 'src/app/shared/interfaces/token-claims.interface';
import { SignUpTokenClaims } from 'src/app/shared/models/sign-up-token-claims.model';
import { UserService } from '../user/user.service';

interface IdTokenClaims extends AuthenticationResult {
  idTokenClaims: {
    acr?: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _loggedIn = false;
  get loggedIn(): boolean {
    return this._loggedIn;
  }
  private readonly _destroying$ = new Subject<void>();

  constructor(
    @Inject(MSAL_GUARD_CONFIG) private _msalGuardConfig: MsalGuardConfiguration,
    private _msalAuthService: MsalService,
    private _msalBroadcastService: MsalBroadcastService,
    private _userService: UserService
  ) {}

  init(): void {
    this.checkAccount();

    this._msalBroadcastService.msalSubject$
      .pipe(
        filter((msg: EventMessage) => msg.eventType === EventType.LOGIN_SUCCESS || msg.eventType === EventType.ACQUIRE_TOKEN_SUCCESS),
        takeUntil(this._destroying$)
      )
      .subscribe((result: EventMessage) => {
        let payload: IdTokenClaims = <AuthenticationResult>result.payload;

        // We need to reject id tokens that were not issued with the default sign-in policy.
        // "acr" claim in the token tells us what policy is used (NOTE: for new policies (v2.0), use "tfp" instead of "acr")
        // To learn more about b2c tokens, visit https://docs.microsoft.com/en-us/azure/active-directory-b2c/tokens-overview

        if (payload.idTokenClaims?.acr === b2cPolicies.names.forgotPassword) {
          window.alert('Password has been reset successfully. \nPlease sign-in with your new password.');
          return this._msalAuthService.logout();
        } else if (payload.idTokenClaims['acr'] === b2cPolicies.names.editProfile) {
          window.alert('Profile has been updated successfully. \nPlease sign-in again.');
          return this._msalAuthService.logout();
        }

        this.checkAccount();
        return result;
      });

    this._msalBroadcastService.msalSubject$
      .pipe(
        filter((msg: EventMessage) => msg.eventType === EventType.LOGIN_FAILURE || msg.eventType === EventType.ACQUIRE_TOKEN_FAILURE),
        takeUntil(this._destroying$)
      )
      .subscribe((result: EventMessage) => {
        if (result.error instanceof AuthError) {
          // Check for forgot password error
          // Learn more about AAD error codes at https://docs.microsoft.com/azure/active-directory/develop/reference-aadsts-error-codes
          if (result.error.message.includes('AADB2C90118')) {
            // login request with reset authority
            let resetPasswordFlowRequest = {
              scopes: ['openid'],
              authority: b2cPolicies.authorities.forgotPassword.authority
            };

            this.login(resetPasswordFlowRequest);
          }
        }
      });
  }

  checkAccount(): void {
    this._loggedIn = this._msalAuthService.instance.getAllAccounts().length > 0;
  }

  login(userFlowRequest?: RedirectRequest | PopupRequest): void {
    this._msalGuardConfig;
    if (this._msalGuardConfig.interactionType === InteractionType.Popup) {
      if (this._msalGuardConfig.authRequest) {
        this._msalAuthService.loginPopup({ ...this._msalGuardConfig.authRequest, ...userFlowRequest }).subscribe(() => this.checkAccount());
      } else {
        this._msalAuthService.loginPopup(userFlowRequest).subscribe(() => this.checkAccount());
      }
    } else {
      if (this._msalGuardConfig.authRequest) {
        this._msalAuthService.loginRedirect({ ...this._msalGuardConfig.authRequest, ...userFlowRequest });
      } else {
        this._msalAuthService.loginRedirect(userFlowRequest);
      }
    }
  }

  logout(): void {
    this._msalAuthService.logout();
  }

  editProfile(): void {
    let editProfileFlowRequest = {
      scopes: ['openid'],
      authority: b2cPolicies.authorities.editProfile.authority
    };

    this.login(editProfileFlowRequest);
  }

  destroy(): void {}

  handleRedirectShallow(): void {
    // It needs this to prevent interaction_in_progress exception
    this._msalAuthService.handleRedirectObservable();
  }

  handleRedirect(): Observable<AuthenticationResult> {
    return this._msalAuthService.handleRedirectObservable();
  }

  async processAuthResult(result: AuthenticationResult) {
    const tokenClaims = result.idTokenClaims as TokenClaims;

    if (tokenClaims.newUser) {
      // Sign Up
      await this._userService.registerUser(new SignUpTokenClaims(tokenClaims));
    } else {
      // Sign In
      this._userService.getCurrentUser().subscribe(user => {
        console.log(user); // TEST
      });
    }
  }
}
