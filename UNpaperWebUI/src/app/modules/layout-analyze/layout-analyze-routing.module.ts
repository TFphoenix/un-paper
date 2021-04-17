import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CredentialsResolver } from 'src/app/core/resolvers/credentials/credentials.resolver';
import { LayoutAnalyzeComponent } from './components/layout-analyze/layout-analyze.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutAnalyzeComponent,
    resolve: {
      credentials: CredentialsResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutAnalyzeRoutingModule {}
