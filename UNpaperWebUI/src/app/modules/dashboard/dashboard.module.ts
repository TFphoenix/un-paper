import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { CarouselComponent } from './components/carousel/carousel.component';

@NgModule({
  declarations: [DashboardComponent, CarouselComponent],
  imports: [CommonModule, DashboardRoutingModule, MaterialModule, SharedModule]
})
export class DashboardModule {}
