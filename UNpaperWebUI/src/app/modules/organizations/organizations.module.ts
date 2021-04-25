import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganizationsRoutingModule } from './organizations-routing.module';
import { OrganizationsComponent } from './components/organizations/organizations.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { OrganizationCreateUpdateComponent } from './components/organization-create-update/organization-create-update.component';

@NgModule({
  declarations: [OrganizationsComponent, OrganizationCreateUpdateComponent],
  imports: [CommonModule, SharedModule, MaterialModule, OrganizationsRoutingModule]
})
export class OrganizationsModule {}
