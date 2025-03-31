import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { openUrl } from '@tauri-apps/plugin-opener'
import { catchError, map, Observable, of } from 'rxjs'
import { QuakItem } from 'src/app/core/models/quak-item.model'
import { SettingsService } from 'src/app/core/settings/settings.service'
import { Repo } from './models/repo.model'

@Injectable({
  providedIn: 'root',
})
export class ReposService {
  private readonly http = inject(HttpClient)
  private readonly settings = inject(SettingsService)
  private readonly router = inject(Router)

  getRepos(): Observable<QuakItem[]> {
    const headers = {
      Authorization: `Basic ${btoa(`:${this.settings.get('azurePAT')}`)}`,
    }

    return this.http
      .get<{
        value: Repo[]
      }>('https://wkeuds.visualstudio.com/NewPOL/_apis/git/repositories', {
        headers,
      })
      .pipe(
        map((response) =>
          response.value.map((source) => ({
            actions: [
              {
                action: () => openUrl(source.webUrl),
                description: 'open',
                ctrl: false,
                key: 'Enter',
              },
              {
                action: () =>
                  this.router.navigate(['/', 'pull-requests', source.name]),
                description: 'PRs',
                ctrl: true,
                key: 'y',
              },
            ],
            description: source.webUrl,
            id: crypto.getRandomValues(new Uint32Array(1)).at(0)!,
            title: source.name,
          })),
        ),
        catchError((error) => {
          console.log(error)
          return of([])
        }),
      )
  }
}
