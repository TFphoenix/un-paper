import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomAnalyzeRoutingModule } from './custom-analyze-routing.module';
import { CustomAnalyzeComponent } from './components/custom-analyze/custom-analyze.component';
import { FottModule } from 'src/@fott/fott.module';

@NgModule({
  declarations: [CustomAnalyzeComponent],
  imports: [CommonModule, CustomAnalyzeRoutingModule, FottModule]
})
export class CustomAnalyzeModule {}
