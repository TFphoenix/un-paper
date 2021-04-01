import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutAnalyzeComponent } from './components/layout-analyze/layout-analyze.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutAnalyzeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutAnalyzeRoutingModule {}
