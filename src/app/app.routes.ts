import { Routes } from '@angular/router'

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/raindrops/raindrop.component').then(
        (c) => c.RaindropComponent,
      ),
  },
  {
    path: 'setup',
    loadComponent: () =>
      import('./features/setup/setup.component').then((c) => c.SetupComponent),
  },
]
