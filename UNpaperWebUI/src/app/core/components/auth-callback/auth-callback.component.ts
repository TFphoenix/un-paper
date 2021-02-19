import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationResult } from '@azure/msal-browser';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-auth-callback',
  templateUrl: './auth-callback.component.html',
  styleUrls: ['./auth-callback.component.scss']
})
export class AuthCallbackComponent implements OnInit, OnDestroy {
  constructor(private readonly _authService: AuthService, private readonly _router: Router) {}

  ngOnInit(): void {
    console.log('Entered AuthCallback');

    this._authService.init();

    // handle auth response
    const redirectObservable = this._authService.handleRedirect();

    // subscribe to redirect response
    redirectObservable.subscribe({
      next: this.authNext.bind(this),
      error: this.authError.bind(this),
      complete: this.authComplete.bind(this)
    });
  }

  private async authNext(result: AuthenticationResult) {
    await this._authService.processAuthResult(result);
  }

  private authError(error: any) {
    console.log(error);
    //TODO: Handle Profile edit cancel and password forgot errors here (maybe remove init())
    // window.location.href = '/';
  }

  private authComplete() {
    console.log('Auth completed');
    //TODO: Find a way to call the auth API
    this._router.navigate(['/']);
    // window.location.href = '/';
  }

  ngOnDestroy(): void {
    console.log('Exited AuthCallback');
  }
}
