import { NgModule } from '@angular/core';
import { LayoutPredictPageAngular } from './components/pages/layoutPredictPage/layoutPredictPageAngular';
import { CommonModule } from '@angular/common';
import { PrebuiltPredictPageAngular } from './components/pages/prebuiltPredictPage/prebuiltPredictPageAngular';

@NgModule({
  declarations: [LayoutPredictPageAngular, PrebuiltPredictPageAngular],
  imports: [CommonModule],
  exports: [LayoutPredictPageAngular, PrebuiltPredictPageAngular],
  providers: []
})
export class FottModule {}
