import { Routes } from '@angular/router'

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'raindrops',
    pathMatch: 'full',
  },
  {
    path: 'raindrops',
    loadComponent: () =>
      import('@features/raindrops/raindrop.component').then(
        (c) => c.RaindropComponent,
      ),
  },
  {
    path: 'settings',
    loadComponent: () =>
      import('@features/setup/setup.component').then((c) => c.SetupComponent),
  },
  {
    path: 'work-items',
    loadComponent: () =>
      import('@features/work-items/work-items.component').then(
        (c) => c.WorkItemsComponent,
      ),
  },
  {
    path: 'pull-requests/:repo',
    loadComponent: () =>
      import('@features/pull-requests/pull-requests.component').then(
        (c) => c.PullRequestsComponent,
      ),
  },
  {
    path: 'pipelines',
    loadComponent: () =>
      import('@features/pipelines/pipelines.component').then(
        (c) => c.PipelinesComponent,
      ),
  },
  {
    path: 'releases',
    loadComponent: () =>
      import('@features/releases/release.component').then(
        (c) => c.ReleasesComponent,
      ),
  },
  {
    path: 'repos',
    loadComponent: () =>
      import('@features/repos/repos.component').then((c) => c.ReposComponent),
  },
]
