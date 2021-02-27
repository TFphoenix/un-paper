import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  constructor(private readonly _authService: AuthService) {}

  ngOnInit(): void {
    this._authService.init();
    this._authService.handleRedirect();
  }

  login() {
    this._authService.login();
  }

  ngOnDestroy(): void {
    this._authService.logout();
  }
}
