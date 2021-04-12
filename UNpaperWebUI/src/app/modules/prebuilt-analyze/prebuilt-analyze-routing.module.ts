import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrebuiltAnalyzeComponent } from './components/prebuilt-analyze/prebuilt-analyze.component';

const routes: Routes = [
  {
    path: '',
    component: PrebuiltAnalyzeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrebuiltAnalyzeRoutingModule {}
