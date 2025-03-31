import { Component, inject, input } from '@angular/core'
import { rxResource } from '@angular/core/rxjs-interop'
import { QuakListComponent } from 'src/app/libs/ui/quak-list/quak-list.component'
import { QuakSearchComponent } from 'src/app/libs/ui/quak-search/quak-search.component'
import { PullRequestsService } from './pull-requests.service'

@Component({
  selector: 'app-pull-requests',
  template: `
    <app-quak-search
      #search
      (down)="list.down()"
      (up)="list.up()"
      (keyChange)="list.handleKeys($event)"
    />

    <app-quak-list
      #list
      [items]="data.value() || []"
      [searchTerm]="search.query()"
      (clicked)="search.query.set('')"
    />
  `,
  imports: [QuakSearchComponent, QuakListComponent],
})
export class PullRequestsComponent {
  private readonly service = inject(PullRequestsService)
  readonly repo = input.required<string>()

  readonly data = rxResource({
    request: this.repo,
    loader: ({ request }) => this.service.getPullRequests(request),
  })
}
