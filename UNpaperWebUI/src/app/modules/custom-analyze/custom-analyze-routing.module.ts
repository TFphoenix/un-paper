import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomAnalyzeComponent } from './components/custom-analyze/custom-analyze.component';

const routes: Routes = [
  // {
  //   path: '',
  //   component: BatchesComponent
  // },
  {
    path: ':id',
    component: CustomAnalyzeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomAnalyzeRoutingModule {}
