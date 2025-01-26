import { Component, inject } from '@angular/core'
import { rxResource } from '@angular/core/rxjs-interop'

import { QuakListComponent } from 'src/app/libs/ui/quak-list/quak-list.component'
import { QuakSearchComponent } from 'src/app/libs/ui/quak-search/quak-search.component'
import { RaindropService } from './raindrop.service'

@Component({
  selector: 'app-raindrop',
  imports: [QuakListComponent, QuakSearchComponent],
  template: `
    <app-quak-search
      #search
      (down)="list.down()"
      (up)="list.up()"
      (enter)="[list.triggerSelectedAction(), search.query.set('')]"
    />

    <app-quak-list
      #list
      [items]="data.value() || []"
      [searchTerm]="search.query()"
      (clicked)="search.query.set('')"
    />
  `,
})
export class RaindropComponent {
  private readonly raindrop = inject(RaindropService)

  data = rxResource({
    loader: () => this.raindrop.getRaindrops(),
  })
}
