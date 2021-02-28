import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Constants } from 'src/app/shared/constants';
import { AuthService } from '../../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class HomeGuard implements CanActivate {
  constructor(private readonly _router: Router, private readonly _authService: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this._authService.checkAccount();

    if (this._authService.loggedIn) {
      return this._router.parseUrl(Constants.DefaultRoute);
    }

    return this._router.parseUrl(Constants.LandingRoute);
  }
}
