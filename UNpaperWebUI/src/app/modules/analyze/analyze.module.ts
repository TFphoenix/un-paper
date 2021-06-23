import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnalyzeRoutingModule } from './analyze-routing.module';
import { AnalyzeComponent } from './components/analyze/analyze.component';
import { FottModule } from 'src/@fott/fott.module';

@NgModule({
  declarations: [AnalyzeComponent],
  imports: [CommonModule, AnalyzeRoutingModule, FottModule]
})
export class AnalyzeModule {}
