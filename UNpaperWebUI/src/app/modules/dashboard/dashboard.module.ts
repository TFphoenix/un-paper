import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AppAngularWrapper } from 'src/@fott/src/AppAngularWrapper';

@NgModule({
  declarations: [DashboardComponent, AppAngularWrapper],
  imports: [CommonModule, DashboardRoutingModule]
})
export class DashboardModule {}
