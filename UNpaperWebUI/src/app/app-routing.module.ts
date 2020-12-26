import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './core/components/home/home.component';
import { EmptyLayoutComponent } from './core/layouts/empty-layout/empty-layout.component';
import { MainLayoutComponent } from './core/layouts/main-layout/main-layout.component';

const ROUTES: Routes = [
  // main layout routes
  {
    path: '',
    component: MainLayoutComponent,
    canActivateChild: [], //TODO: Here will general guards be declared (like EULA, SIGN-UP, etc.)
    children: [
      {
        path: '',
        component: HomeComponent,
        pathMatch: 'full'
      }
    ]
  },
  // empty layout routes
  {
    path: '',
    component: EmptyLayoutComponent,
    children: [
      // TODO: auth-callback
    ]
  },
  // no layout routes
  { path: '**', redirectTo: '/' } // all unhandled routes redirect to this
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
