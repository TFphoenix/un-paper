import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CredentialsResolver } from 'src/app/core/resolvers/credentials/credentials.resolver';
import { PrebuiltAnalyzeComponent } from './components/prebuilt-analyze/prebuilt-analyze.component';

const routes: Routes = [
  {
    path: '',
    component: PrebuiltAnalyzeComponent,
    resolve: {
      credentials: CredentialsResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrebuiltAnalyzeRoutingModule {}
