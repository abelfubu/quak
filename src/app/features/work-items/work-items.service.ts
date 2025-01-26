import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { catchError, forkJoin, map, Observable, of, switchMap, tap } from 'rxjs'
import { QuakItem } from 'src/app/core/models/quak-item.model'
import { SettingsService } from 'src/app/core/settings/settings.service'
import { workItemAdapter } from './adapters/work-item.adapter'
import { WorkItem } from './models/work-item.model'

@Injectable({
  providedIn: 'root',
})
export class WorkItemsService {
  private readonly http = inject(HttpClient)
  private readonly settings = inject(SettingsService)

  getWorkItems(): Observable<QuakItem[]> {
    const headers = {
      Authorization: `Basic ${btoa(`:${this.settings.get('azurePAT')}`)}`,
    }

    return this.http
      .post<{ workItems: { id: number }[] }>(
        'https://wkeuds.visualstudio.com/_apis/wit/wiql?api-version=5',
        {
          // query: `SELECT * FROM WorkItems WHERE [System.ChangedDate] >= @Today - 60 AND [System.AssignedTo] = @Me AND [System.NodeName] IN ('Krypton Team', 'Atalaya Team', 'Eternia Team', 'Castillo Grayskull', 'Estación Zeta') AND [System.WorkItemType] IN ('Task', 'User Story', 'Bug', 'Defect')`,
          query: `SELECT * FROM WorkItems WHERE [System.ChangedDate] >= @Today - 60 AND [System.State] != "Removed" AND [System.NodeName] IN ('Krypton Team', 'Atalaya Team', 'Eternia Team', 'Castillo Grayskull', 'Estación Zeta') AND [System.WorkItemType] IN ('Task', 'User Story', 'Bug', 'Defect')`,
        },
        { headers },
      )
      .pipe(
        map((res) =>
          res.workItems.reduce<{ current: number[]; [key: number]: number[] }>(
            (acc, wi) => {
              if (acc.current.length === 200) {
                acc[wi.id] = acc.current
                acc.current = []
              }

              acc.current.push(wi.id)
              return acc
            },
            { current: [] },
          ),
        ),
        map((requestIds) =>
          Object.values(requestIds).map((ids) =>
            `https://wkeuds.visualstudio.com/_apis/wit/workItems?ids=`.concat(
              ids.join(','),
            ),
          ),
        ),
        switchMap((urls) =>
          forkJoin(
            urls.map((url) =>
              this.http.get<{ count: number; value: WorkItem[] }>(url, {
                headers,
              }),
            ),
          ),
        ),
        map((response) =>
          response.flatMap((res) => res.value.map(workItemAdapter)),
        ),
        tap(console.log),
        catchError((error) => {
          console.log(error)
          return of([])
        }),
      )
  }
}
