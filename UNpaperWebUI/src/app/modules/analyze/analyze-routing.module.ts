import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MetadataResolver } from 'src/app/core/resolvers/metadata/metadata.resolver';
import { AnalyzeComponent } from './components/analyze/analyze.component';

const routes: Routes = [
  {
    path: ':id',
    component: AnalyzeComponent,
    resolve: {
      metadata: MetadataResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnalyzeRoutingModule {}
