import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BatchesRoutingModule } from './batches-routing.module';
import { BatchesComponent } from './components/batches/batches.component';


@NgModule({
  declarations: [BatchesComponent],
  imports: [
    CommonModule,
    BatchesRoutingModule
  ]
})
export class BatchesModule { }
