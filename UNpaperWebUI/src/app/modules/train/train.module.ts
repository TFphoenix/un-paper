import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrainRoutingModule } from './train-routing.module';
import { TrainComponent } from './components/train/train.component';
import { FottModule } from 'src/@fott/fott.module';

@NgModule({
  declarations: [TrainComponent],
  imports: [CommonModule, TrainRoutingModule, FottModule]
})
export class TrainModule {}
