import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { from, map, Observable, of, switchMap } from 'rxjs'
import { Raindrop } from './models/raindrop.model'
import { load } from '@tauri-apps/plugin-store'

interface RaindropResponse {
  items: Raindrop[]
}

@Injectable({
  providedIn: 'root',
})
export class RaindropService {
  private readonly http = inject(HttpClient)

  getRaindrops(): Observable<{ id: number; title: string; url: string }[]> {
    return from(load('store.json', { autoSave: false })).pipe(
      switchMap((store) => from(store.get('raindrop-token'))),
      switchMap((token) => {
        if (!token) return of([])

        return this.http
          .get<RaindropResponse>(
            'https://api.raindrop.io/rest/v1/raindrops/0',
            { headers: { Authorization: `Bearer ${token}` } },
          )
          .pipe(
            map(({ items }) =>
              items.map((r) => ({ id: r._id, title: r.title, url: r.link })),
            ),
          )
      }),
    )
  }
}
