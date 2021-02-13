import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { apiConfig } from 'src/app/configs/b2c-config';
import { AuthService } from '../../services/auth/auth.service';
import { ConfigService } from '../../services/config/config.service';
import { RequestService } from '../../services/request/request.service';

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
    private readonly _requestService: RequestService
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

  //TEST: Delete this communication test
  testAPI() {
    this._requestService
      .get(
        apiConfig.uri + '/WeatherForecast',
        new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8', 'Ocp-Apim-Subscription-Key': apiConfig.apimSubscriptionKey })
      )
      .subscribe(weather => {
        console.log(weather);
      });
  }

  ngOnDestroy(): void {
    this._authService.logout();
  }
}
