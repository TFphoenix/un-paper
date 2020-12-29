import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private authService: MsalService) {}

  ngOnInit(): void {
    // It needs this to prevent interaction_in_progress exception
    this.authService.handleRedirectObservable().subscribe({
      next: result => console.log('Home: ' + result),
      error: error => console.log('Home: ' + error)
    });
  }
}
