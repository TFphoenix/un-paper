import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MetadataResolver } from 'src/app/core/resolvers/metadata/metadata.resolver';
import { TrainComponent } from './components/train/train.component';

const routes: Routes = [
  {
    path: ':id',
    component: TrainComponent,
    resolve: {
      metadata: MetadataResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainRoutingModule {}
