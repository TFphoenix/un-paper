import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthenticationResult } from '@azure/msal-browser';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-auth-callback',
  templateUrl: './auth-callback.component.html',
  styleUrls: ['./auth-callback.component.scss']
})
export class AuthCallbackComponent implements OnInit, OnDestroy {
  constructor(private readonly _authService: AuthService) {}

  ngOnInit(): void {
    console.log('Entered AuthCallback');

    this._authService.init();

    // handle auth response
    this._authService.handleRedirect().subscribe({
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
    //TODO: Handle Profile edit cancel and password forgot errors here (maybe remove init())
  }

  private authComplete() {
    console.log('Auth completed');
    //TODO: Password successfully reset, you will be redirected to the homepage soon
    window.location.href = '/';
  }

  ngOnDestroy(): void {
    console.log('Exited AuthCallback');
  }
}
