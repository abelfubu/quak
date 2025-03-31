import { inject, InjectionToken } from '@angular/core'
import { Router } from '@angular/router'
import { QuakItem } from '../models/quak-item.model'

export const NAVIGATION_ITEMS = new InjectionToken<
  (QuakItem & { path: string })[]
>('NAVIGATION_ITEMS', {
  providedIn: 'root',
  factory: () => {
    const router = inject(Router)

    return [
      {
        actions: [
          {
            action: () => router.navigate(['raindrops']),
            description: 'go',
            ctrl: false,
            key: 'Enter',
          },
        ],
        description: 'Go to Raindrops',
        id: crypto.getRandomValues(new Uint32Array(1)).at(0)!,
        path: 'raindrops',
        title: 'Raindrops',
      },
      {
        actions: [
          {
            action: () => router.navigate(['work-items']),
            description: 'go',
            ctrl: false,
            key: 'Enter',
          },
        ],
        description: 'Go to Azure work items',
        id: crypto.getRandomValues(new Uint32Array(1)).at(0)!,
        path: 'work-items',
        title: 'Work Items',
      },
      {
        actions: [
          {
            action: () =>
              router.navigate(['pull-requests', 'ERPRepo.Client.OINV']),
            description: 'go',
            ctrl: false,
            key: 'Enter',
          },
        ],
        description: 'Go to Azure PRs',
        id: crypto.getRandomValues(new Uint32Array(1)).at(0)!,
        path: 'pull-requests',
        title: 'Pull Requests',
      },
      {
        HHactions: [
          {
            action: () => router.navigate(['repos']),
            description: 'go',
            ctrl: false,
            key: 'Enter',
          },
        ],
        description: 'Go to Azure Repos',
        id: crypto.getRandomValues(new Uint32Array(1)).at(0)!,
        path: 'repos',
        title: 'Repos',
      },
      {
        actions: [
          {
            action: () => router.navigate(['pipelines']),
            description: 'go',
            ctrl: false,
            key: 'Enter',
          },
        ],
        description: 'Go to Azure Pipelines',
        id: crypto.getRandomValues(new Uint32Array(1)).at(0)!,
        path: 'pipelines',
        title: 'Pipelines',
      },
      {
        actions: [
          {
            action: () => router.navigate(['releases']),
            description: 'go',
            ctrl: false,
            key: 'Enter',
          },
        ],
        description: 'Go to Azure Releases',
        id: crypto.getRandomValues(new Uint32Array(1)).at(0)!,
        path: 'releases',
        title: 'Releases',
      },
      {
        actions: [
          {
            action: () => router.navigate(['settings']),
            description: 'go',
            ctrl: false,
            key: 'Enter',
          },
        ],
        description: 'Go to the setup page',
        id: crypto.getRandomValues(new Uint32Array(1)).at(0)!,
        path: 'settings',
        title: 'Settings',
      },
    ]
  },
})
