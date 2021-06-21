import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProject } from 'src/@fott/models/applicationState';

@Component({
  selector: 'unp-custom-analyze',
  templateUrl: './custom-analyze.component.html',
  styleUrls: ['./custom-analyze.component.scss']
})
export class CustomAnalyzeComponent implements OnInit {
  private batchMetadata: IProject;

  constructor(private readonly _route: ActivatedRoute) {}

  ngOnInit(): void {
    this.batchMetadata = this._route.snapshot.data['metadata'];
    console.log('Batch metadata acquired', this.batchMetadata);
  }
}
