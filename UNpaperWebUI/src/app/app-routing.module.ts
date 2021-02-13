import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthCallbackComponent } from './core/components/auth-callback/auth-callback.component';
import { HomeComponent } from './core/components/home/home.component';
import { EmptyLayoutComponent } from './core/layouts/empty-layout/empty-layout.component';
import { MainLayoutComponent } from './core/layouts/main-layout/main-layout.component';

const ROUTES: Routes = [
  // main layout routes
  {
    path: '',
    component: MainLayoutComponent,
    canActivateChild: [], //REMEMBER: Here will general guards be declared (like EULA, SIGN-UP, etc.)
    children: [{ path: '', component: HomeComponent, pathMatch: 'full' }]
  },
  // empty layout routes
  {
    path: '',
    component: EmptyLayoutComponent,
    children: [
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
