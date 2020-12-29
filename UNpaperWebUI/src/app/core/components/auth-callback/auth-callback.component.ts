import { Component, OnDestroy, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult } from '@azure/msal-browser';

@Component({
  selector: 'app-auth-callback',
  templateUrl: './auth-callback.component.html',
  styleUrls: ['./auth-callback.component.scss']
})
export class AuthCallbackComponent implements OnInit, OnDestroy {
  constructor(private authService: MsalService) {}

  ngOnInit(): void {
    console.log('Entered AuthCallback');

    // handle auth response
    this.authService.handleRedirectObservable().subscribe({
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
