import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', loadChildren: () => import('./pages/base/base.module').then(x => x.BaseModule) }
];
