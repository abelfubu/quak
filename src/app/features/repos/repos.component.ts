import { Component, inject } from '@angular/core'
import { rxResource } from '@angular/core/rxjs-interop'
import { QuakListComponent } from 'src/app/libs/ui/quak-list/quak-list.component'
import { QuakSearchComponent } from 'src/app/libs/ui/quak-search/quak-search.component'
import { ReposService } from './repos.service'

@Component({
  selector: 'app-repos',
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
export class ReposComponent {
  private readonly service = inject(ReposService)

  readonly data = rxResource({
    loader: () => this.service.getRepos(),
  })
}
