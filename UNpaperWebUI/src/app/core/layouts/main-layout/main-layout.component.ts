import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MsalService, MsalBroadcastService, MSAL_GUARD_CONFIG, MsalGuardConfiguration } from '@azure/msal-angular';
import { EventMessage, EventType, InteractionType, PopupRequest, RedirectRequest } from '@azure/msal-browser';
import { AuthenticationResult, AuthError } from '@azure/msal-common';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { b2cPolicies } from 'src/app/configs/b2c-config';

interface IdTokenClaims extends AuthenticationResult {
  idTokenClaims: {
    acr?: string;
  };
}

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit, OnDestroy {
  title = 'UNpaper';
  isIframe = false;
  loggedIn = false;
  private readonly _destroying$ = new Subject<void>();

  constructor(
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private authService: MsalService,
    private msalBroadcastService: MsalBroadcastService
  ) {}

  ngOnInit(): void {
    this.isIframe = window !== window.parent && !window.opener;

    this.checkAccount();

    this.msalBroadcastService.msalSubject$
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
          return this.authService.logout();
        } else if (payload.idTokenClaims['acr'] === b2cPolicies.names.editProfile) {
          window.alert('Profile has been updated successfully. \nPlease sign-in again.');
          return this.authService.logout();
        }

        this.checkAccount();
        return result;
      });

    this.msalBroadcastService.msalSubject$
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

  checkAccount() {
    this.loggedIn = this.authService.instance.getAllAccounts().length > 0;
  }

  login(userFlowRequest?: RedirectRequest | PopupRequest) {
    this.msalGuardConfig;
    if (this.msalGuardConfig.interactionType === InteractionType.Popup) {
      if (this.msalGuardConfig.authRequest) {
        this.authService.loginPopup({ ...this.msalGuardConfig.authRequest, ...userFlowRequest }).subscribe(() => this.checkAccount());
      } else {
        this.authService.loginPopup(userFlowRequest).subscribe(() => this.checkAccount());
      }
    } else {
      if (this.msalGuardConfig.authRequest) {
        this.authService.loginRedirect({ ...this.msalGuardConfig.authRequest, ...userFlowRequest });
      } else {
        this.authService.loginRedirect(userFlowRequest);
      }
    }
  }

  logout() {
    this.authService.logout();
  }

  editProfile() {
    let editProfileFlowRequest = {
      scopes: ['openid'],
      authority: b2cPolicies.authorities.editProfile.authority
    };

    this.login(editProfileFlowRequest);
  }

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }
}
