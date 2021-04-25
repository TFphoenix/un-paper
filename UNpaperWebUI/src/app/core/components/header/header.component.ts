import { Component, OnDestroy, OnInit } from '@angular/core';
import { Constants } from 'src/app/shared/constants';
import { AuthService } from '../../services/auth/auth.service';
import { RegistryApiRequestService } from '../../services/request/registry-api-request.service';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userName: string = Constants.Strings.userDataPlaceholder;
  userEmail: string = Constants.Strings.userDataPlaceholder;

  constructor(
    private readonly _authService: AuthService,
    private readonly _requestService: RegistryApiRequestService,
    private readonly _userService: UserService
  ) {}

  ngOnInit(): void {
    this._authService.init();
    this._authService.handleRedirect();
    this.populateUserData();
  }

  logout() {
    this._authService.logout();
  }

  editProfile() {
    this._authService.editProfile();
  }

  onNotificationClick() {}

  onCalendarClick() {}

  private populateUserData() {
    this._userService.getCurrentUser().subscribe(user => {
      console.log(user); // TEST
      this.userName = user.name;
      this.userEmail = user.email;
    });
  }
}
