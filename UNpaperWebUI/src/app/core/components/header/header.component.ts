import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { RegistryApiRequestService } from '../../services/request/registry-api-request.service';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(
    private readonly _authService: AuthService,
    private readonly _requestService: RegistryApiRequestService,
    private readonly _userService: UserService
  ) {}

  ngOnInit(): void {
    this._authService.init();
    this._authService.handleRedirect();
  }

  logout() {
    this._authService.logout();
  }

  editProfile() {
    this._authService.editProfile();
  }

  testAPI() {
    this._userService.getCurrentUser().subscribe(user => {
      console.log(user);
    });
  }
}
