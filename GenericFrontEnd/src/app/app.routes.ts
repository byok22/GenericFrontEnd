import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:'',
        redirectTo:'',
        pathMatch: 'full'
    },
    {
        path:'',
        loadComponent: () => import('./core/master-page/master-page.component').then(a=>a.MasterPageComponent),
        children:[]

    }
];
