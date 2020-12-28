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
    // handle auth response
    this.authService.handleRedirectObservable().subscribe({
      next: result => console.log(result),
      error: error => console.log(error)
    });
  }
}
