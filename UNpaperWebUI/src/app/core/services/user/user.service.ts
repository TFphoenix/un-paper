import { Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { Observable } from 'rxjs';
import { TokenClaims } from 'src/app/shared/interfaces/token-claims.interface';
import { BatchRequest } from 'src/app/shared/models/batch-request.model';
import { OrganizationRequest } from 'src/app/shared/models/organization-request.model';
import { SignUpTokenClaims } from 'src/app/shared/models/sign-up-token-claims.model';
import { UserRequest } from 'src/app/shared/models/user-request.model';
import { RegistryApiRequestService } from '../request/registry-api-request.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private readonly _requestService: RegistryApiRequestService,
    private readonly _authService: MsalService
  ) {}

  registerUser(tokenClaims: SignUpTokenClaims) {
    return this._requestService.post('/user/auth', {});
  }

  getCurrentUser(): Observable<UserRequest> {
    return this._requestService.get('/user/auth');
  }

  getUserOrganizations(includeBatches: boolean = false): Observable<OrganizationRequest[]> {
    if (includeBatches) {
      return this._requestService.get('/user/organizations?batches=true');
    }

    return this._requestService.get('/user/organizations');
  }

  getUserBatches(includeOrganization: boolean = false): Observable<BatchRequest[]> {
    if (includeOrganization) {
      return this._requestService.get('/user/batches?organization=true');
    }

    return this._requestService.get('/user/batches');
  }

  getUserClaims() {
    return this._authService.instance.getAllAccounts()[0].idTokenClaims as TokenClaims;
  }
}
