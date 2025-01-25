import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { load } from '@tauri-apps/plugin-store'
import { catchError, from, map, Observable, of, switchMap, tap } from 'rxjs'
import { Raindrop } from './models/raindrop.model'
import { getCurrentWebviewWindow } from '@tauri-apps/api/webviewWindow'
import { openUrl } from '@tauri-apps/plugin-opener'

interface RaindropResponse {
  items: Raindrop[]
}

@Injectable({
  providedIn: 'root',
})
export class RaindropService {
  private readonly http = inject(HttpClient)

  getRaindrops(): Observable<
    { id: number; title: string; description: string; action: () => unknown }[]
  > {
    return from(load('store.json', { autoSave: false })).pipe(
      switchMap((store) =>
        from(store.get<{ value: string }>('raindrop-token')),
      ),
      switchMap((token) => {
        if (!token) return of([])

        return this.http
          .get<RaindropResponse>(
            'https://api.raindrop.io/rest/v1/raindrops/0',
            { headers: { Authorization: `Bearer ${token.value}` } },
          )
          .pipe(
            tap((a) => console.log(a)),
            map(({ items }) =>
              items.map(({ _id, title, link }) => ({
                id: _id,
                title: title,
                description: link,
                action: () =>
                  openUrl(link).then(() => getCurrentWebviewWindow().hide()),
              })),
            ),
          )
      }),
      catchError((error) => {
        console.log(error)
        return of([])
      }),
    )
  }
}
