import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BatchDocumentsComponent } from './components/batch-documents/batch-documents.component';
import { BatchesComponent } from './components/batches/batches.component';

const routes: Routes = [
  {
    path: '',
    component: BatchesComponent
  },
  {
    path: ':id',
    component: BatchDocumentsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BatchesRoutingModule {}
