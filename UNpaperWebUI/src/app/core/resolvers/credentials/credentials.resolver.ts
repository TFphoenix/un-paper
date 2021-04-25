import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { FunctionsApiRequestService } from '../../services/request/functions-api-request.service';

@Injectable({
  providedIn: 'root'
})
export class CredentialsResolver implements Resolve<boolean> {
  constructor(private readonly _functionsRequestService: FunctionsApiRequestService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    console.log('Acquiring Form Recognizer credentials...');

    return this._functionsRequestService.get('/credentials');
  }
}
