import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BatchService } from 'src/app/core/services/batch/batch.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { ConfirmationDialogDeleteComponent } from 'src/app/shared/components/confirmation-dialog-delete/confirmation-dialog-delete.component';
import { TableColumn } from 'src/app/shared/interfaces/table-column.interface';
import { BatchData } from 'src/app/shared/models/batch-data.model';
import { BatchRequest } from 'src/app/shared/models/batch-request.model';
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

  constructor(
    private readonly _batchService: BatchService,
    private readonly _userService: UserService,
    private readonly _dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this._userService.getUserBatches(true).subscribe(batches => {
      const data: BatchData[] = [];
      batches.forEach(batch => {
        data.push(BatchData.getFromRequest(batch));
      });
      this.tableData = data;
    });
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
