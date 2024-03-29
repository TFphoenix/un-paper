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
import {
  IPublicClientApplication,
  PublicClientApplication,
  InteractionType
} from '@azure/msal-browser';
import { appConfig } from '../configs/b2c-config';
import { AuthCallbackComponent } from './components/auth-callback/auth-callback.component';
import { AuthService } from './services/auth/auth.service';
import { RequestService } from './services/request/request.service';
import { UserService } from './services/user/user.service';
import { SharedModule } from '../shared/shared.module';
import { RegistryApiRequestService } from './services/request/registry-api-request.service';
import { HeaderComponent } from './components/header/header.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { LandingComponent } from './components/landing/landing.component';
import { HomeGuard } from './guards/home/home.guard';
import { AuthGuard } from './guards/auth/auth.guard';
import { LandingGuard } from './guards/landing/landing.guard';
import { environment } from 'src/environments/environment';
import { FunctionsApiRequestService } from './services/request/functions-api-request.service';
import { IconService } from '@visurel/iconify-angular';
import { OrganizationService } from './services/organization/organization.service';
import { DocumentService } from './services/document/document.service';
import { StoreProviderService } from './services/store-provider/store-provider.service';

// MSAL FACTORIES
export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication(appConfig);
}

export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, Array<string>>();
  protectedResourceMap.set(environment.services.registryApi, environment.b2cScopes);
  protectedResourceMap.set(environment.services.functionsApi, environment.b2cScopes);

  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap
  };
}

export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return {
    interactionType: InteractionType.Redirect,
    authRequest: {
      scopes: [...environment.b2cScopes]
    }
  };
}

@NgModule({
  declarations: [
    HomeComponent,
    MainLayoutComponent,
    EmptyLayoutComponent,
    AuthCallbackComponent,
    HeaderComponent,
    SidenavComponent,
    LandingComponent
  ],
  providers: [
    // services
    AuthService,
    ConfigService,
    RequestService,
    RegistryApiRequestService,
    FunctionsApiRequestService,
    UserService,
    OrganizationService,
    DocumentService,
    StoreProviderService,

    // guards
    HomeGuard,
    AuthGuard,
    LandingGuard,

    // etc
    {
      provide: APP_INITIALIZER,
      useFactory: (
        configService: ConfigService,
        iconService: IconService,
        storeProviderService: StoreProviderService
      ) =>
        function () {
          // if AppInitializerService is created with dependency injection then Angular will return some errors
          const appInitializerService = new AppInitializerService(
            configService,
            iconService,
            storeProviderService
          );
          return appInitializerService.load();
        },
      multi: true,
      deps: [ConfigService, IconService, StoreProviderService]
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
  imports: [CommonModule, SharedModule, MaterialModule, RouterModule, MsalModule, HttpClientModule],
  exports: [MaterialModule, AuthCallbackComponent, HomeComponent, LandingComponent]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() core: CoreModule) {
    if (core) {
      throw new Error('Core module should be imported only in the root module');
    }
  }
}
