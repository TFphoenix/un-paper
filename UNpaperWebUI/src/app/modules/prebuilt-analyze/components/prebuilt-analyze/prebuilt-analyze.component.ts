import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPrebuiltSettings } from 'src/@fott/models/applicationState';

@Component({
  selector: 'unp-prebuilt-analyze',
  templateUrl: './prebuilt-analyze.component.html',
  styleUrls: ['./prebuilt-analyze.component.scss']
})
export class PrebuiltAnalyzeComponent implements OnInit {
  credentials: IPrebuiltSettings;

  constructor(private readonly _route: ActivatedRoute) {}

  ngOnInit(): void {
    this.credentials = this._route.snapshot.data['credentials'].formRecognizer;
    console.log('Form Recognizer credentials acquired');
  }
}
