import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { openUrl } from '@tauri-apps/plugin-opener'
import { map, Observable } from 'rxjs'
import { QuakItem } from 'src/app/core/models/quak-item.model'
import { SettingsService } from 'src/app/core/settings/settings.service'
import { Pipeline } from './models/pipeline.model'

@Injectable({
  providedIn: 'root',
})
export class PipelinesService {
  private readonly http = inject(HttpClient)
  private readonly settings = inject(SettingsService)

  getPipeline(): Observable<QuakItem[]> {
    const headers = {
      Authorization: `Basic ${btoa(`:${this.settings.get('azurePAT')}`)}`,
    }

    return this.http
      .get<{
        value: Pipeline[]
      }>('https://wkeuds.visualstudio.com/NewPOL/_apis/pipelines?api-version=7.1-preview.1', { headers })
      .pipe(
        map((response) =>
          response.value
            .filter((p) => !`${p.name}${p.folder}`.includes('OLD'))
            .map((p) => ({
              actions: [
                {
                  action: () => openUrl(p._links.web.href),
                  description: 'open',
                  ctrl: false,
                  key: 'Enter',
                },
              ],
              description: p.url,
              id: p.id,
              title: p.name,
            })),
        ),
      )
  }
}
