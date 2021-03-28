import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganizationsRoutingModule } from './organizations-routing.module';
import { OrganizationsComponent } from './components/organizations/organizations.component';


@NgModule({
  declarations: [OrganizationsComponent],
  imports: [
    CommonModule,
    OrganizationsRoutingModule
  ]
})
export class OrganizationsModule { }
