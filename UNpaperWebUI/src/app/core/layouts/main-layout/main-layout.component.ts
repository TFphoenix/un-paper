import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { ConfigService } from '../../services/config/config.service';
import { RegistryApiRequestService } from '../../services/request/registry-api-request.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit, OnDestroy {
  title = 'UNpaper';
  isIframe = false;

  public get loggedIn(): boolean {
    return this._authService.loggedIn;
  }

  constructor(private readonly _authService: AuthService, private readonly _requestService: RegistryApiRequestService) {}

  ngOnInit(): void {
    this.isIframe = window !== window.parent && !window.opener;

    this._authService.init();
  }

  login() {
    this._authService.login();
  }

  logout() {
    this._authService.logout();
  }

  editProfile() {
    this._authService.editProfile();
  }

  //TEST: Delete this communication test
  testAPI() {
    this._requestService.get('/WeatherForecast').subscribe(weather => {
      console.log(weather);
    });
  }

  ngOnDestroy(): void {
    this._authService.logout();
  }
}
