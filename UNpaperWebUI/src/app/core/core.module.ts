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
  MsalModule,
  MsalGuardConfiguration,
  MsalInterceptorConfiguration
} from '@azure/msal-angular';
import { APP_INITIALIZER } from '@angular/core';
import { AppInitializerService } from './services/app-initializer/app-initializer.service';
import { Optional } from '@angular/core';
import { SkipSelf } from '@angular/core';
import { IPublicClientApplication, PublicClientApplication, InteractionType } from '@azure/msal-browser';
import { appConfig, apiConfig } from '../configs/b2c-config';
import { AuthCallbackComponent } from './components/auth-callback/auth-callback.component';
import { AuthService } from './services/auth/auth.service';

export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication(appConfig);
}

export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, Array<string>>();
  protectedResourceMap.set(apiConfig.uri, apiConfig.scopes);

  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap
  };
}

export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return {
    interactionType: InteractionType.Redirect,
    authRequest: {
      scopes: [...apiConfig.scopes]
    }
  };
}

@NgModule({
  declarations: [HomeComponent, MainLayoutComponent, EmptyLayoutComponent, AuthCallbackComponent],
  providers: [
    // services
    ConfigService,
    AuthService,

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
    // MSAL
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
    },
    MsalService,
    MsalGuard,
    MsalBroadcastService
  ],
  imports: [CommonModule, MaterialModule, RouterModule, MsalModule, HttpClientModule],
  exports: [MaterialModule, AuthCallbackComponent]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() core: CoreModule) {
    if (core) {
      throw new Error('Core module should be imported only in the root module');
    }
  }
}
