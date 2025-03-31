import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { openUrl } from '@tauri-apps/plugin-opener'
import { map, Observable } from 'rxjs'
import { QuakItem } from 'src/app/core/models/quak-item.model'
import { SettingsService } from 'src/app/core/settings/settings.service'
import { Release } from './models/release.model'

@Injectable({
  providedIn: 'root',
})
export class ReleasesService {
  private readonly http = inject(HttpClient)
  private readonly settings = inject(SettingsService)

  getReleases(): Observable<QuakItem[]> {
    const headers = {
      Authorization: `Basic ${btoa(`:${this.settings.get('azurePAT')}`)}`,
    }

    return this.http
      .get<{
        value: Release[]
      }>('https://wkeuds.vsrm.visualstudio.com/NewPOL/_apis/Release/releases', {
        headers,
      })
      .pipe(
        map((response) =>
          Object.values(
            response.value.reduce<Record<number, Release>>(
              (releases, current) => {
                const found = releases[current.releaseDefinition.id]

                if (!found || found.createdOn < current.createdOn) {
                  releases[current.releaseDefinition.id] = current
                }

                return releases
              },
              {},
            ),
          ).map((p) => ({
            actions: [
              {
                action: () => openUrl(p.releaseDefinition._links.web.href),
                description: 'open',
                ctrl: false,
                key: 'Enter',
              },
            ],
            description: `${p.createdBy.displayName} on ${new Date(p.createdOn).toDateString()}`,
            id: p.id,
            title: p.releaseDefinition.name,
          })),
        ),
      )
  }
}
