import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthCallbackComponent } from './core/components/auth-callback/auth-callback.component';
import { HomeComponent } from './core/components/home/home.component';
import { LandingComponent } from './core/components/landing/landing.component';
import { AuthGuard } from './core/guards/auth/auth.guard';
import { HomeGuard } from './core/guards/home/home.guard';
import { LandingGuard } from './core/guards/landing/landing.guard';
import { EmptyLayoutComponent } from './core/layouts/empty-layout/empty-layout.component';
import { MainLayoutComponent } from './core/layouts/main-layout/main-layout.component';

const ROUTES: Routes = [
  // main layout routes
  {
    path: '',
    component: MainLayoutComponent,
    canActivateChild: [AuthGuard], //REMEMBER: Here will general guards be declared (like EULA, SIGN-UP, etc.)
    children: [
      {
        path: '',
        component: HomeComponent,
        pathMatch: 'full',
        canActivate: [HomeGuard]
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'organizations',
        loadChildren: () => import('./modules/organizations/organizations.module').then(m => m.OrganizationsModule)
      },
      {
        path: 'batches',
        loadChildren: () => import('./modules/batches/batches.module').then(m => m.BatchesModule)
      },
      {
        path: 'layout',
        loadChildren: () => import('./modules/layout-analyze/layout-analyze.module').then(m => m.LayoutAnalyzeModule)
      }
    ]
  },
  // empty layout routes
  {
    path: '',
    component: EmptyLayoutComponent,
    children: [
      {
        path: 'landing',
        component: LandingComponent,
        pathMatch: 'full',
        canActivate: [LandingGuard]
      },
      {
        // Needed for hash routing
        path: 'error',
        component: AuthCallbackComponent
      },
      {
        // Needed for hash routing
        path: 'state',
        component: AuthCallbackComponent
      },
      {
        // Needed for hash routing
        path: 'code',
        component: AuthCallbackComponent
      },
      {
        path: 'auth-callback',
        component: AuthCallbackComponent
      }
    ]
  },
  // no layout routes
  { path: '**', redirectTo: '/' } // all unhandled routes redirect to this
];

const isIframe = window !== window.parent && !window.opener;

@NgModule({
  imports: [
    RouterModule.forRoot(ROUTES, {
      useHash: true,
      // Don't perform initial navigation in iframes
      initialNavigation: !isIframe ? 'enabled' : 'disabled'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
