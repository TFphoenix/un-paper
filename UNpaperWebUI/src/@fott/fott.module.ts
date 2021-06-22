import { NgModule } from '@angular/core';
import { LayoutPredictPageAngular } from './components/pages/layoutPredictPage/layoutPredictPageAngular';
import { CommonModule } from '@angular/common';
import { PrebuiltPredictPageAngular } from './components/pages/prebuiltPredictPage/prebuiltPredictPageAngular';
import { EditorPagePageAngular } from './components/pages/editorPage/editorPageAngular';
import { TrainPagePageAngular } from './components/pages/trainPage/trainPageAngular';

@NgModule({
  declarations: [
    LayoutPredictPageAngular,
    PrebuiltPredictPageAngular,
    EditorPagePageAngular,
    TrainPagePageAngular
  ],
  imports: [CommonModule],
  exports: [
    LayoutPredictPageAngular,
    PrebuiltPredictPageAngular,
    EditorPagePageAngular,
    TrainPagePageAngular
  ],
  providers: []
})
export class FottModule {}
