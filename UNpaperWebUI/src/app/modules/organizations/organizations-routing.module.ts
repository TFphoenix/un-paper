import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrganizationsComponent } from './components/organizations/organizations.component';

const routes: Routes = [
  {
    path: '',
    component: OrganizationsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizationsRoutingModule {}
