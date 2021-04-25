import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutAnalyzeComponent } from './components/layout-analyze/layout-analyze.component';
import { LayoutAnalyzeRoutingModule } from './layout-analyze-routing.module';
import { FottModule } from 'src/@fott/fott.module';

@NgModule({
  declarations: [LayoutAnalyzeComponent],
  imports: [CommonModule, LayoutAnalyzeRoutingModule, FottModule]
})
export class LayoutAnalyzeModule {}
