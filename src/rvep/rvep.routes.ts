import { provideRouter, RouterConfig } from '@angular/router';

import { Signin } from './signin/signin.component';
import { Dashboard } from './dashboard/dashboard.component';

const routes:RouterConfig = [
    {path: '', component: Signin},
    {path: 'dashboard', component: Dashboard}
];

export const rvepRouterProviders = [
    provideRouter(routes)
];
