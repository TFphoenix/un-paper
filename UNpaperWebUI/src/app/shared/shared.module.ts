import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableComponent } from './components/data-table/data-table.component';
import { MaterialModule } from '../modules/material/material.module';
import { IconModule } from '@visurel/iconify-angular';
import { ConfirmationDialogDeleteComponent } from './components/confirmation-dialog-delete/confirmation-dialog-delete.component';
import { LoadingSplashscreenComponent } from './components/loading-splashscreen/loading-splashscreen.component';

@NgModule({
  declarations: [
    DataTableComponent,
    ConfirmationDialogDeleteComponent,
    LoadingSplashscreenComponent
  ],
  imports: [CommonModule, MaterialModule, IconModule],
  exports: [DataTableComponent, LoadingSplashscreenComponent]
})
export class SharedModule {}
