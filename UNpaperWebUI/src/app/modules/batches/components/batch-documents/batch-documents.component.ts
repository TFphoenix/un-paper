import { Component, EventEmitter, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { BatchService } from 'src/app/core/services/batch/batch.service';
import { TableColumn } from 'src/app/shared/interfaces/table-column.interface';
import { BatchRequest } from 'src/app/shared/models/batch-request.model';
import { DocumentData } from 'src/app/shared/models/document-data.model';
import { TableAction } from 'src/app/shared/models/table-action.model';
import { DocumentManagerComponent } from 'src/app/shared/components/document-manager/document-manager.component';
import { DocumentManagerData } from 'src/app/shared/models/document-manager-data.model';
import { DocumentService } from 'src/app/core/services/document/document.service';
import { ConfirmationDialogDeleteComponent } from 'src/app/shared/components/confirmation-dialog-delete/confirmation-dialog-delete.component';
import { DocumentRequest } from 'src/app/shared/models/document-request.model';

@Component({
  selector: 'unp-batch-documents',
  templateUrl: './batch-documents.component.html',
  styleUrls: ['./batch-documents.component.scss']
})
export class BatchDocumentsComponent implements OnInit {
  currentBatch: BatchRequest;
  tableData: DocumentData[] = [];

  tableColumns: TableColumn<DocumentData>[] = [
    { label: '', property: 'icon', type: 'badge', visible: true },
    { label: 'Name', property: 'name', type: 'text', visible: true },
    { label: 'Size', property: 'length', type: 'fileSize', visible: true },
    { label: 'Created', property: 'createdOn', type: 'date', visible: true },
    { label: 'Last Modified', property: 'lastModifiedOn', type: 'date', visible: true },
    { label: 'Actions', property: 'actions', type: 'button', visible: true }
  ];

  previewAction = new EventEmitter<any>();
  openInLayoutAction = new EventEmitter<any>();
  openInPrebuiltAction = new EventEmitter<any>();
  tableActions: TableAction[] = [
    {
      name: 'Preview',
      icon: 'icVisibility',
      onClick: this.previewAction
    },
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
    private readonly _documentService: DocumentService,
    private readonly _route: ActivatedRoute,
    private readonly _router: Router,
    private readonly _dialog: MatDialog
  ) {
    // Table actions subscriptions
    this.previewAction.subscribe(document => {
      this.previewDocument(document);
    });

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

  previewDocument(document: DocumentData) {
    // TODO
    console.log(document);
  }

  editDocument(document: DocumentData) {
    // TODO
  }

  deleteDocument(document: DocumentData) {
    const deleteDialogRef = this._dialog.open(ConfirmationDialogDeleteComponent, {
      data: { type: 'Document', name: document.name }
    });
    deleteDialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this._documentService
          .delete(this.currentBatch.organizationId, this.currentBatch.id, [document])
          .subscribe({
            next: result => {
              this.removeDocument(document);
            },
            error: errorMessage => {
              console.error(errorMessage);
            }
          });
      }
    });
  }

  uploadDocuments() {
    this._dialog
      .open(DocumentManagerComponent, {
        data: {
          activeBatch: this.currentBatch
        } as DocumentManagerData
      })
      .afterClosed()
      .subscribe(documentManagerData => {
        this.populateBatchDocuments();
      });
  }

  labelData() {
    this._router.navigate([`/custom/${this.currentBatch.id}`], {
      state: { selectedBatch: this.currentBatch }
    });
  }

  trainData() {
    this._router.navigate([`/train/${this.currentBatch.id}`], {
      state: { selectedBatch: this.currentBatch }
    });
  }

  analyzeData() {
    this._router.navigate([`/analyze/${this.currentBatch.id}`], {
      state: { selectedBatch: this.currentBatch }
    });
  }

  private populateBatchData() {
    this._route.params.subscribe(params => {
      this._batchService.getById(params['id'], true).subscribe({
        next: batch => {
          this.currentBatch = batch;
          this.populateBatchDocuments();

          document.title = `UNpaper - Batch: ${this.currentBatch.name}`;
        },
        error: e => {
          console.error(e); //TODO: Implement loading screen and not found splash-screen
          this._router.navigate(['/batches']);
        }
      });
    });
  }

  private populateBatchDocuments() {
    this._documentService
      .getDocuments(this.currentBatch.organizationId, this.currentBatch.id)
      .subscribe(documents => {
        const data: DocumentData[] = [];

        documents.forEach(document => {
          data.push(DocumentData.getFromRequest(document));
        });

        this.tableData = data;
      });
  }

  private openInLayout(document: any) {
    // TODO
    throw new Error('Method not implemented.');
  }

  private openInPrebuilt(document: any) {
    // TODO
    throw new Error('Method not implemented.');
  }

  private removeDocument(removeDocument: DocumentRequest) {
    const data = [...this.tableData];
    data.splice(
      data.findIndex(doc => doc.name === removeDocument.name),
      1
    );
    this.tableData = data;
  }
}
