import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProject } from 'src/@fott/models/applicationState';

@Component({
  selector: 'unp-analyze',
  templateUrl: './analyze.component.html',
  styleUrls: ['./analyze.component.scss']
})
export class AnalyzeComponent implements OnInit {
  batchMetadata: IProject;

  constructor(private readonly _route: ActivatedRoute) {}

  ngOnInit(): void {
    this.batchMetadata = this._route.snapshot.data['metadata'];
    console.log('Batch metadata acquired', this.batchMetadata);
  }
}
