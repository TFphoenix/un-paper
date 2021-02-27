import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {
  isIframe = false;

  constructor() {}

  ngOnInit(): void {
    this.isIframe = window !== window.parent && !window.opener;
  }
}
