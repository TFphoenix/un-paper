import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableComponent } from './components/data-table/data-table.component';
import { MaterialModule } from '../modules/material/material.module';
import { IconModule } from '@visurel/iconify-angular';

@NgModule({
  declarations: [DataTableComponent],
  imports: [CommonModule, MaterialModule, IconModule],
  exports: [DataTableComponent]
})
export class SharedModule {}
