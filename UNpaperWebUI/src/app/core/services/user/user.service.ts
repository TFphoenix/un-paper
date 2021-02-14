import { Injectable } from '@angular/core';
import { SignInTokenClaims } from 'src/app/shared/models/sign-in-token-claims.model';
import { SignUpTokenClaims } from 'src/app/shared/models/sign-up-token-claims.model';
import { RequestService } from '../request/request.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private readonly _requestService: RequestService) {}

  signUp(tokenClaims: SignUpTokenClaims) {
    // TODO
  }

  signIn(tokenClaims: SignInTokenClaims) {
    // TODO
  }
}
