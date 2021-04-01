import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutAnalyzeComponent } from './components/layout-analyze/layout-analyze.component';
import { LayoutAnalyzeRoutingModule } from './layout-analyze-routing.module';
import { CanvasCommandBarComponent } from './components/canvas-command-bar/canvas-command-bar.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [LayoutAnalyzeComponent, CanvasCommandBarComponent],
  imports: [CommonModule, LayoutAnalyzeRoutingModule, SharedModule, MaterialModule]
})
export class LayoutAnalyzeModule {}
