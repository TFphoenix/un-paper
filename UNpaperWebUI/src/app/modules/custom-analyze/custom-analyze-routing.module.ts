import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MetadataResolver } from 'src/app/core/resolvers/metadata/metadata.resolver';
import { CustomAnalyzeComponent } from './components/custom-analyze/custom-analyze.component';

const routes: Routes = [
  {
    path: ':id',
    component: CustomAnalyzeComponent,
    resolve: {
      metadata: MetadataResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomAnalyzeRoutingModule {}
