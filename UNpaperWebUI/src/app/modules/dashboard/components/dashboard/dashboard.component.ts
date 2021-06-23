import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  userName: string = 'Teodor Mihaescu';
  userEmail: string = 'mihaescu.teodor@yahoo.com';

  constructor() {}

  ngOnInit(): void {}
}
