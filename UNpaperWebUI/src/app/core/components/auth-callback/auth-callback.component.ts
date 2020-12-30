import { Component, OnDestroy, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult } from '@azure/msal-browser';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-auth-callback',
  templateUrl: './auth-callback.component.html',
  styleUrls: ['./auth-callback.component.scss']
})
export class AuthCallbackComponent implements OnInit, OnDestroy {
  constructor(private _msalAuthService: MsalService, private readonly _authService: AuthService) {}

  ngOnInit(): void {
    console.log('Entered AuthCallback');

    // handle auth response
    this._msalAuthService.handleRedirectObservable().subscribe({
      next: this.authNext,
      error: this.authError,
      complete: this.authComplete
    });
  }

  private authNext(result: AuthenticationResult) {
    console.log(result);
  }

  private authError(error: any) {
    console.log(error);
  }

  private authComplete() {
    console.log('Auth completed');
  }

  ngOnDestroy(): void {
    console.log('Exited AuthCallback');
  }
}
