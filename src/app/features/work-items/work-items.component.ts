import { Component, inject } from '@angular/core'
import { rxResource } from '@angular/core/rxjs-interop'
import { QuakListComponent } from '../../libs/ui/quak-list/quak-list.component'
import { QuakSearchComponent } from '../../libs/ui/quak-search/quak-search.component'
import { WorkItemsService } from './work-items.service'

@Component({
  selector: 'app-work-items',
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
export class WorkItemsComponent {
  private readonly service = inject(WorkItemsService)

  readonly data = rxResource({
    loader: () => this.service.getWorkItems(),
  })
}
