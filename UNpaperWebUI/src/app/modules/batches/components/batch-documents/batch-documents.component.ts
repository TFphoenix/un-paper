import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BatchService } from 'src/app/core/services/batch/batch.service';
import { BatchRequest } from 'src/app/shared/models/batch-request.model';

@Component({
  selector: 'unp-batch-documents',
  templateUrl: './batch-documents.component.html',
  styleUrls: ['./batch-documents.component.scss']
})
export class BatchDocumentsComponent implements OnInit {
  currentBatch: BatchRequest = {
    name: 'Loading Batch...',
    description: '',
    organizationId: ''
  };

  constructor(
    private readonly _batchService: BatchService,
    private readonly _route: ActivatedRoute,
    private readonly _router: Router
  ) {}

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      this._batchService.getById(params['id'], true).subscribe({
        next: batch => {
          this.currentBatch = batch;
        },
        error: e => {
          console.error(e); //TODO: Implement loading screen and not found splash-screen
          this._router.navigate(['/batches']);
        }
      });
    });
  }
}
