import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableComponent } from './components/data-table/data-table.component';
import { MaterialModule } from '../modules/material/material.module';
import { IconModule } from '@visurel/iconify-angular';
import { ConfirmationDialogDeleteComponent } from './components/confirmation-dialog-delete/confirmation-dialog-delete.component';
import { LoadingSplashscreenComponent } from './components/loading-splashscreen/loading-splashscreen.component';
import { DocumentManagerComponent } from './components/document-manager/document-manager.component';
import { FileUploadModule } from 'ng2-file-upload';
import { FileSizeFormatPipe } from './pipes/file-size-format/file-size-format.pipe';

@NgModule({
  declarations: [
    DataTableComponent,
    ConfirmationDialogDeleteComponent,
    LoadingSplashscreenComponent,
    DocumentManagerComponent,
    FileSizeFormatPipe
  ],
  imports: [CommonModule, MaterialModule, IconModule, FileUploadModule],
  exports: [
    DataTableComponent,
    ConfirmationDialogDeleteComponent,
    LoadingSplashscreenComponent,
    DocumentManagerComponent,
    FileSizeFormatPipe
  ]
})
export class SharedModule {}
