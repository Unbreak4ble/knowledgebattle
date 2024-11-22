import { Routes } from '@angular/router';
import { BaseComponent } from './pages/base/base.component';

export const routes: Routes = [
    { path: '', component: BaseComponent, loadChildren: () => import('./pages/base/base.module').then(x => x.BaseModule) }
];
