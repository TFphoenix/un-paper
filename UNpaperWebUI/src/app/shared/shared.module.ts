import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableComponent } from './components/data-table/data-table.component';
import { MaterialModule } from '../modules/material/material.module';
import { IconModule } from '@visurel/iconify-angular';
import { ConfirmationDialogDeleteComponent } from './components/confirmation-dialog-delete/confirmation-dialog-delete.component';
import { LoadingSplashscreenComponent } from './components/loading-splashscreen/loading-splashscreen.component';
import { DocumentManagerComponent } from './components/document-manager/document-manager.component';
import { FileUploadModule } from 'ng2-file-upload';

@NgModule({
  declarations: [
    DataTableComponent,
    ConfirmationDialogDeleteComponent,
    LoadingSplashscreenComponent,
    DocumentManagerComponent
  ],
  imports: [CommonModule, MaterialModule, IconModule, FileUploadModule],
  exports: [
    DataTableComponent,
    ConfirmationDialogDeleteComponent,
    LoadingSplashscreenComponent,
    DocumentManagerComponent
  ]
})
export class SharedModule {}
