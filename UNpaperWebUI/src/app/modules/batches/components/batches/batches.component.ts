import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BatchService } from 'src/app/core/services/batch/batch.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { ConfirmationDialogDeleteComponent } from 'src/app/shared/components/confirmation-dialog-delete/confirmation-dialog-delete.component';
import { TableColumn } from 'src/app/shared/interfaces/table-column.interface';
import { BatchData } from 'src/app/shared/models/batch-data.model';
import { BatchRequest } from 'src/app/shared/models/batch-request.model';
import { OrganizationData } from 'src/app/shared/models/organization-data.model';
import { BatchCreateUpdateComponent } from '../batch-create-update/batch-create-update.component';

@Component({
  selector: 'app-batches',
  templateUrl: './batches.component.html',
  styleUrls: ['./batches.component.scss']
})
export class BatchesComponent implements OnInit {
  tableData: BatchData[] = [];

  tableColumns: TableColumn<BatchData>[] = [
    { label: '', property: 'icon', type: 'badge', visible: true },
    { label: 'Name', property: 'name', type: 'text', visible: true },
    { label: 'Description', property: 'description', type: 'text', visible: true },
    { label: 'Organization', property: 'organizationName', type: 'text', visible: true },
    { label: 'Actions', property: 'actions', type: 'button', visible: true }
  ];

  selectedOrganization: OrganizationData;

  constructor(
    private readonly _batchService: BatchService,
    private readonly _userService: UserService,
    private readonly _dialog: MatDialog,
    private readonly _router: Router
  ) {}

  ngOnInit(): void {
    document.title = 'UNpaper - Batches';

    this.populateBatches();
  }

  addBatch() {
    this._dialog
      .open(BatchCreateUpdateComponent)
      .afterClosed()
      .subscribe(batch => {
        if (batch) {
          this._batchService.create(batch).subscribe({
            next: createdBatch => {
              const data = [...this.tableData];
              data.push(BatchData.getFromRequest(createdBatch));
              this.tableData = data;
            },
            error: errorMessage => {
              console.error(errorMessage);
            }
          });
        }
      });
  }

  editBatch(batch: BatchData) {
    this._dialog
      .open(BatchCreateUpdateComponent, {
        data: batch
      })
      .afterClosed()
      .subscribe(updatedBatch => {
        if (updatedBatch) {
          this._batchService.update(updatedBatch).subscribe({
            next: result => {
              this.updateBatch(updatedBatch);
            },
            error: errorMessage => {
              console.error(errorMessage);
            }
          });
        }
      });
  }

  deleteBatch(batch: BatchData) {
    const deleteDialogRef = this._dialog.open(ConfirmationDialogDeleteComponent, {
      data: { type: 'Batch', name: batch.name }
    });
    deleteDialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this._batchService.delete(batch.id).subscribe({
          next: result => {
            this.removeBatch(batch);
          },
          error: errorMessage => {
            console.error(errorMessage);
          }
        });
      }
    });
  }

  removeSelectedOrganization() {
    history.state.selectedOrganization = this.selectedOrganization = null;
    this.populateBatches();
  }

  gotoBatchDocuments(batch: BatchData) {
    this._router.navigate([`/batches/${batch.id}`]);
  }

  private populateBatches() {
    this.selectedOrganization = history.state.selectedOrganization as OrganizationData;

    if (this.selectedOrganization) {
      // Organization's batches
      this._userService.getUserBatches(true).subscribe(batches => {
        const data: BatchData[] = [];
        batches.forEach(batch => {
          if (batch.organizationId === this.selectedOrganization.id) {
            data.push(BatchData.getFromRequest(batch));
          }
        });
        this.tableData = data;
      });
    } else {
      // All batches
      this._userService.getUserBatches(true).subscribe(batches => {
        const data: BatchData[] = [];
        batches.forEach(batch => {
          data.push(BatchData.getFromRequest(batch));
        });
        this.tableData = data;
      });
    }
  }

  private updateBatch(updatedBatch: BatchRequest) {
    const data = [...this.tableData];
    const index = data.findIndex(o => o.id === updatedBatch.id);
    data[index] = BatchData.getFromRequest(updatedBatch);
    this.tableData = data;
  }

  private removeBatch(removeBatch: BatchRequest) {
    const data = [...this.tableData];
    data.splice(
      data.findIndex(o => o.id === removeBatch.id),
      1
    );
    this.tableData = data;
  }
}
