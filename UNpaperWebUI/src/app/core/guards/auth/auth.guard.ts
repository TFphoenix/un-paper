import { Injectable } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Constants } from 'src/app/shared/constants';
import { AuthService } from '../../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivateChild {
  constructor(private readonly _router: Router, private readonly _authService: AuthService) {}

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this._authService.checkAccount();

    // If logged in
    if (this._authService.loggedIn) {
      return true;
    }

    // If home route
    if (childRoute.url.toString() === '') {
      return true;
    }

    // If not logged in
    return this._router.parseUrl('');
  }
}
