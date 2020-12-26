import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigService } from './services/config/config.service';
import { HomeComponent } from './components/home/home.component';
import { MaterialModule } from '../modules/material/material.module';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { EmptyLayoutComponent } from './layouts/empty-layout/empty-layout.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [HomeComponent, MainLayoutComponent, EmptyLayoutComponent],
  providers: [ConfigService],
  imports: [CommonModule, MaterialModule, RouterModule],
  exports: []
})
export class CoreModule {}
