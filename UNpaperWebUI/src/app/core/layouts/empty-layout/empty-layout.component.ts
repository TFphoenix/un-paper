import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-empty-layout',
  templateUrl: './empty-layout.component.html',
  styleUrls: ['./empty-layout.component.scss']
})
export class EmptyLayoutComponent implements OnInit {
  isIframe = false;

  constructor() {}

  ngOnInit(): void {
    this.isIframe = window !== window.parent && !window.opener;
  }
}
