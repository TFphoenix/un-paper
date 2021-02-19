import { Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { Observable } from 'rxjs';
import { TokenClaims } from 'src/app/shared/interfaces/token-claims.interface';
import { SignUpTokenClaims } from 'src/app/shared/models/sign-up-token-claims.model';
import { UserRequest } from 'src/app/shared/models/user-request.model';
import { RegistryApiRequestService } from '../request/registry-api-request.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private readonly _requestService: RegistryApiRequestService, private readonly _authService: MsalService) {}

  async registerUser(tokenClaims: SignUpTokenClaims) {
    await this._requestService.post('/auth/user', JSON.stringify(new UserRequest(tokenClaims))).subscribe(response => {
      console.log(response); // TEST
    });
  }

  getCurrentUser(): Observable<UserRequest> {
    const tokenClaims = this.getAuthenticatedAccountTokenClaims();
    return this._requestService.get('/auth/user/' + tokenClaims.oid);
  }

  private getAuthenticatedAccountTokenClaims() {
    return this._authService.instance.getAllAccounts()[0].idTokenClaims as TokenClaims;
  }
}
