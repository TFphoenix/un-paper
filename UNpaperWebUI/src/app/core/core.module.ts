import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigService } from './services/config/config.service';
import { HomeComponent } from './components/home/home.component';
import { MaterialModule } from '../modules/material/material.module';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { EmptyLayoutComponent } from './layouts/empty-layout/empty-layout.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  MsalGuard,
  MsalInterceptor,
  MsalBroadcastService,
  MsalService,
  MSAL_GUARD_CONFIG,
  MSAL_INSTANCE,
  MSAL_INTERCEPTOR_CONFIG,
  MsalModule
} from '@azure/msal-angular';
import { MSALGuardConfigFactory, MSALInstanceFactory, MSALInterceptorConfigFactory } from '../configs/b2c-config';
import { APP_INITIALIZER } from '@angular/core';
import { AppInitializerService } from './services/app-initializer/app-initializer.service';
import { Optional } from '@angular/core';
import { SkipSelf } from '@angular/core';

@NgModule({
  declarations: [HomeComponent, MainLayoutComponent, EmptyLayoutComponent],
  providers: [
    // services
    ConfigService,
    MsalService,
    MsalGuard,
    MsalBroadcastService,

    // etc
    {
      provide: APP_INITIALIZER,
      useFactory: (configService: ConfigService) =>
        function () {
          // if AppInitializerService is created with dependency injection then Angular will return some errors
          const appInitializerService = new AppInitializerService(configService);
          return appInitializerService.load();
        },
      multi: true,
      deps: [ConfigService]
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    },
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory
    },
    {
      provide: MSAL_GUARD_CONFIG,
      useFactory: MSALGuardConfigFactory
    },
    {
      provide: MSAL_INTERCEPTOR_CONFIG,
      useFactory: MSALInterceptorConfigFactory
    }
  ],
  imports: [CommonModule, MaterialModule, RouterModule, MsalModule, HttpClientModule],
  exports: [HttpClientModule, MaterialModule]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() core: CoreModule) {
    if (core) {
      throw new Error('Core module should be imported only in the root module');
    }
  }
}
