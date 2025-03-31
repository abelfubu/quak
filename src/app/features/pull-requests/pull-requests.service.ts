import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { catchError, map, Observable, of } from 'rxjs'
import { QuakItem } from 'src/app/core/models/quak-item.model'
import { SettingsService } from 'src/app/core/settings/settings.service'
import { pullRequestAdapter } from './adapters/pull-request.adapter'
import { PullRequest } from './models/pull-request.model'

@Injectable({
  providedIn: 'root',
})
export class PullRequestsService {
  private readonly http = inject(HttpClient)
  private readonly settings = inject(SettingsService)

  getPullRequests(repo: string): Observable<QuakItem[]> {
    const headers = {
      Authorization: `Basic ${btoa(`:${this.settings.get('azurePAT')}`)}`,
    }

    return this.http
      .get<{
        value: PullRequest[]
      }>(
        `https://wkeuds.visualstudio.com/NewPOL/_apis/git/repositories/${repo}/pullRequests?searchCriteria.includeLinks=False`,
        { headers },
      )
      .pipe(
        map((response) => response.value.map(pullRequestAdapter)),
        catchError((error) => {
          console.log(error)
          return of([])
        }),
      )
  }
}
