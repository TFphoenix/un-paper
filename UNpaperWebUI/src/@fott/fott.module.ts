import { NgModule } from '@angular/core';
import { LayoutPredictPageAngular } from './components/pages/layoutPredictPage/layoutPredictPageAngular';
import { CommonModule } from '@angular/common';
import { PrebuiltPredictPageAngular } from './components/pages/prebuiltPredictPage/prebuiltPredictPageAngular';
import { EditorPagePageAngular } from './components/pages/editorPage/editorPageAngular';
import { TrainPagePageAngular } from './components/pages/trainPage/trainPageAngular';
import { PredictPagePageAngular } from './components/pages/predictPage/predictPageAngular';

@NgModule({
  declarations: [
    LayoutPredictPageAngular,
    PrebuiltPredictPageAngular,
    EditorPagePageAngular,
    TrainPagePageAngular,
    PredictPagePageAngular
  ],
  imports: [CommonModule],
  exports: [
    LayoutPredictPageAngular,
    PrebuiltPredictPageAngular,
    EditorPagePageAngular,
    TrainPagePageAngular,
    PredictPagePageAngular
  ],
  providers: []
})
export class FottModule {}
