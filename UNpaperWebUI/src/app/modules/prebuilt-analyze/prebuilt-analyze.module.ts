import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrebuiltAnalyzeComponent } from './components/prebuilt-analyze/prebuilt-analyze.component';
import { PrebuiltAnalyzeRoutingModule } from './prebuilt-analyze-routing.module';

@NgModule({
  declarations: [PrebuiltAnalyzeComponent],
  imports: [CommonModule, PrebuiltAnalyzeRoutingModule]
})
export class PrebuiltAnalyzeModule {}
