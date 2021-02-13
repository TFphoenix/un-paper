import { Injectable } from '@angular/core';
import { RequestService } from '../request/request.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private readonly _requestService: RequestService) {}

  signUp() {}

  signIn() {}
}
