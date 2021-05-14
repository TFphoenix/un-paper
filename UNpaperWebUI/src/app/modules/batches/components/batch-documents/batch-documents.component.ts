import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BatchService } from 'src/app/core/services/batch/batch.service';
import { TableColumn } from 'src/app/shared/interfaces/table-column.interface';
import { BatchRequest } from 'src/app/shared/models/batch-request.model';
import { DocumentData } from 'src/app/shared/models/document-data.model';

@Component({
  selector: 'unp-batch-documents',
  templateUrl: './batch-documents.component.html',
  styleUrls: ['./batch-documents.component.scss']
})
export class BatchDocumentsComponent implements OnInit {
  currentBatch: BatchRequest;
  tableData: DocumentData[] = [
    {
      icon: 'icDocument',
      name: 'Test Document Name #1'
    }
  ];
  tableColumns: TableColumn<DocumentData>[] = [
    { label: '', property: 'icon', type: 'badge', visible: true },
    { label: 'Name', property: 'name', type: 'text', visible: true },
    { label: 'Actions', property: 'actions', type: 'button', visible: true }
  ];

  constructor(
    private readonly _batchService: BatchService,
    private readonly _route: ActivatedRoute,
    private readonly _router: Router
  ) {}

  ngOnInit(): void {
    this.populateBatchData();
  }

  previewDocument(document: DocumentData) {}

  deleteDocument(document: DocumentData) {}

  uploadDocument() {}

  private populateBatchData() {
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

  private populateBatchDocuments() {}
}
