import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { getCurrentWebviewWindow } from '@tauri-apps/api/webviewWindow'
import { openUrl } from '@tauri-apps/plugin-opener'
import { catchError, map, Observable, of } from 'rxjs'
import { QuakItem } from '../../core/models/quak-item.model'
import { SettingsService } from '../../core/settings/settings.service'
import { Raindrop } from '../../models/raindrop.model'

interface RaindropResponse {
  items: Raindrop[]
}

@Injectable({
  providedIn: 'root',
})
export class RaindropService {
  private readonly http = inject(HttpClient)
  private readonly settings = inject(SettingsService)

  getRaindrops(): Observable<QuakItem[]> {
    return this.http
      .get<RaindropResponse>('https://api.raindrop.io/rest/v1/raindrops/0', {
        headers: {
          Authorization: `Bearer ${this.settings.get('raindropToken')}`,
        },
      })
      .pipe(
        map(({ items }) =>
          items.map(({ _id, title, link }) => ({
            id: _id,
            title: title,
            description: link,
            action: async () => {
              await openUrl(link)
              await getCurrentWebviewWindow().hide()
            },
          }))
        ),
        catchError((error) => {
          console.log(error)
          return of([])
        })
      )
  }
}
