import { Routes } from '@angular/router';
import { ThreeSceneComponent } from './three-scene/three-scene';

export const appRoutes: Routes = [
  { path: '', pathMatch: 'full', component: ThreeSceneComponent },
  {
    path: 'login',
    loadComponent: () =>
      import('./auth-page/auth-page.component').then((m) => m.AuthPageComponent),
  },
  { path: '**', redirectTo: '' },
];
