import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BatchesRoutingModule } from './batches-routing.module';
import { BatchesComponent } from './components/batches/batches.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { BatchCreateUpdateComponent } from './components/batch-create-update/batch-create-update.component';

@NgModule({
  declarations: [BatchesComponent, BatchCreateUpdateComponent],
  imports: [CommonModule, SharedModule, MaterialModule, BatchesRoutingModule]
})
export class BatchesModule {}
