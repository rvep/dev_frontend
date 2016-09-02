import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Signin } from './signin/signin.component';
import { Dashboard } from './dashboard/dashboard.component';

const rvepRoutes: Routes = [
    {path: '', component: Signin},
    {path: 'dashboard', component: Dashboard}
];

export const rvepRouterProviders: any[] = [];

export const routing: ModuleWithProviders =
  RouterModule.forRoot(rvepRoutes);
