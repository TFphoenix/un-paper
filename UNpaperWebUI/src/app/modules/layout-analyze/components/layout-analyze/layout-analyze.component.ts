import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPrebuiltSettings } from 'src/@fott/models/applicationState';

@Component({
  selector: 'app-layout-analyze',
  templateUrl: './layout-analyze.component.html',
  styleUrls: ['./layout-analyze.component.scss']
})
export class LayoutAnalyzeComponent implements OnInit {
  credentials: IPrebuiltSettings;

  constructor(private readonly _route: ActivatedRoute) {}

  ngOnInit(): void {
    this.credentials = this._route.snapshot.data['credentials'].formRecognizer;
    console.log('Form Recognizer credentials acquired');
  }
}
