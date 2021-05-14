import { Component, EventEmitter, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { BatchService } from 'src/app/core/services/batch/batch.service';
import { TableColumn } from 'src/app/shared/interfaces/table-column.interface';
import { BatchRequest } from 'src/app/shared/models/batch-request.model';
import { DocumentData } from 'src/app/shared/models/document-data.model';
import { TableAction } from 'src/app/shared/models/table-action.model';
import { DocumentManagerComponent } from 'src/app/shared/components/document-manager/document-manager.component';

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

  openInLayoutAction = new EventEmitter<any>();
  openInPrebuiltAction = new EventEmitter<any>();
  tableActions: TableAction[] = [
    {
      name: 'Open in: Prebuilt Analyze',
      icon: 'icPrebuilt',
      onClick: this.openInPrebuiltAction
    },
    {
      name: 'Open in: Layout Analyze',
      icon: 'icLayout',
      onClick: this.openInLayoutAction
    }
  ];

  constructor(
    private readonly _batchService: BatchService,
    private readonly _route: ActivatedRoute,
    private readonly _router: Router,
    private readonly _dialog: MatDialog
  ) {
    // Table actions subscriptions
    this.openInLayoutAction.subscribe(document => {
      this.openInLayout(document);
    });

    this.openInLayoutAction.subscribe(document => {
      this.openInPrebuilt(document);
    });
  }

  ngOnInit(): void {
    document.title = 'Loading batch...';

    this.populateBatchData();
  }

  previewDocument(document: DocumentData) {}

  deleteDocument(document: DocumentData) {}

  uploadDocument() {
    this._dialog
      .open(DocumentManagerComponent)
      .afterClosed()
      .subscribe(document => {
        // if (organization) {
        //   this._organizationService.create(organization).subscribe({
        //     next: createdOrganization => {
        //       const data = [...this.tableData];
        //       data.push(OrganizationData.getFromRequest(createdOrganization));
        //       this.tableData = data;
        //     },
        //     error: errorMessage => {
        //       console.error(errorMessage);
        //     }
        //   });
        // }
      });
  }

  private populateBatchData() {
    this._route.params.subscribe(params => {
      this._batchService.getById(params['id'], true).subscribe({
        next: batch => {
          this.currentBatch = batch;

          document.title = `UNpaper - Batch: ${this.currentBatch.name}`;
        },
        error: e => {
          console.error(e); //TODO: Implement loading screen and not found splash-screen
          this._router.navigate(['/batches']);
        }
      });
    });
  }

  private populateBatchDocuments() {}

  private openInLayout(document: any) {
    throw new Error('Method not implemented.');
  }

  private openInPrebuilt(document: any) {
    throw new Error('Method not implemented.');
  }
}
