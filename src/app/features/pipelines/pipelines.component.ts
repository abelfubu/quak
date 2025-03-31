import { Component, inject } from '@angular/core'
import { rxResource } from '@angular/core/rxjs-interop'
import { QuakListComponent } from 'src/app/libs/ui/quak-list/quak-list.component'
import { QuakSearchComponent } from 'src/app/libs/ui/quak-search/quak-search.component'
import { PipelinesService } from './pipelines.service'

@Component({
  selector: 'app-pipelines',
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
export class PipelinesComponent {
  private readonly service = inject(PipelinesService)

  readonly data = rxResource({
    loader: () => this.service.getPipeline(),
  })
}
