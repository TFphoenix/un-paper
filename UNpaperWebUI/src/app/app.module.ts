import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainLayoutComponent } from './core/layouts/main-layout/main-layout.component';
import { EmptyLayoutComponent } from './core/layouts/empty-layout/empty-layout.component';
import { CoreModule } from './core/core.module';
import { MaterialModule } from './modules/material/material.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, CoreModule, MaterialModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
