import { NgModule } from '@angular/core';
import { LayoutPredictPageAngular } from './components/pages/layoutPredictPage/layoutPredictPageAngular';
import { CommonModule } from '@angular/common';
import { PrebuiltPredictPageAngular } from './components/pages/prebuiltPredictPage/prebuiltPredictPageAngular';
import { EditorPagePageAngular } from './components/pages/editorPage/editorPageAngular';

@NgModule({
  declarations: [LayoutPredictPageAngular, PrebuiltPredictPageAngular, EditorPagePageAngular],
  imports: [CommonModule],
  exports: [LayoutPredictPageAngular, PrebuiltPredictPageAngular, EditorPagePageAngular],
  providers: []
})
export class FottModule {}
