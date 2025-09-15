import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login.component';
import { LayoutAComponent } from './layouts/layoutA';
import { DashboardComponent } from './pages/private/dashboard.component';
import { SampleComponent } from './pages/private/sample.component';
import { TestComponent } from './pages/private/test.component';
import { AdminPermissionGuard } from '@bion/core';
import { NotFoundComponent } from './pages/notfound.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    canActivate: [AdminPermissionGuard],
    component: LayoutAComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'sample', component: SampleComponent },
      { path: 'test', component: TestComponent },
    ],
  },
  { path: '404', component: NotFoundComponent },
  {
    path: '**',
    canActivate: [AdminPermissionGuard],
    component: NotFoundComponent,
  },
];
