import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthenticationResult } from '@azure/msal-common';
import { AuthService } from '../../services/auth/auth.service';
import { ConfigService } from '../../services/config/config.service';

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

  constructor(
    private readonly _authService: AuthService,
    private readonly _configService: ConfigService,
    private readonly _http: HttpClient
  ) {}

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

  //TODO: Delete test
  private headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
  testAPI() {
    this._http
      .get(this._configService.config.registryAPI + '/WeatherForecast', { headers: this.headers })
      .subscribe((data: any) => console.log(data));
  }

  ngOnDestroy(): void {
    this._authService.logout();
  }
}
