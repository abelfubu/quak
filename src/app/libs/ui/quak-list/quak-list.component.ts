import {
  Component,
  computed,
  inject,
  input,
  linkedSignal,
  output,
} from '@angular/core'
import { listen } from '@tauri-apps/api/event'
import { Fzf } from 'fzf'
import { QuakItem } from 'src/app/core/models/quak-item.model'
import { NAVIGATION_ITEMS } from 'src/app/core/tokens/navigation-items.token'
import { KbdActionsComponent } from '../kbd-actions/bbd-actions.component'

@Component({
  selector: 'app-quak-list',
  imports: [KbdActionsComponent],
  template: `
    <ul class="mt-1">
      @for (item of data(); track item.id) {
        @let selected = $index === currentIndex();

        <li
          class="p-2 text-white rounded-lg cursor-pointer relative"
          [class.selected]="selected"
        >
          <h3 class="truncate">{{ item.title }}</h3>
          <p class="text-[var(--text)] truncate grayscale">
            {{ item.description }}
          </p>

          @if (selected) {
            <app-kbd-actions [actions]="item.actions" />
          }
        </li>
      }
    </ul>
  `,
  styles: `
    .selected {
      background-color: var(--bg-primary);

      h3 {
        color: var(--accent);
      }
    }
  `,
})
export class QuakListComponent {
  private readonly navigationItems = inject(NAVIGATION_ITEMS)

  readonly items = input.required({
    transform: (items: QuakItem[]) =>
      new Fzf(items.concat(this.navigationItems), {
        normalize: true,
        selector: (item) => item.title + item.description,
      }),
  })

  readonly searchTerm = input.required<string>()

  constructor() {
    listen('tauri://focus', () => {
      this.currentIndex.set(0)
    })
  }

  readonly startingPoint = linkedSignal({
    source: this.searchTerm,
    computation: () => 0,
  })

  readonly currentIndex = linkedSignal({
    source: this.searchTerm,
    computation: () => 0,
  })

  readonly clicked = output<void>()

  readonly filtered = computed(() =>
    (this.items() || []).find(this.searchTerm()).map((i) => i.item),
  )

  readonly data = computed(() =>
    this.filtered().slice(this.startingPoint(), this.startingPoint() + 9),
  )

  down(): void {
    if (
      this.currentIndex() < 3 ||
      this.startingPoint() + 9 === this.filtered().length ||
      this.filtered().length < 9
    ) {
      return this.currentIndex.update((i) =>
        Math.min(i + 1, 8, this.filtered().length - 1),
      )
    }

    this.startingPoint.update((i) => i + 1)
  }

  up(): void {
    if (
      this.currentIndex() < 3 ||
      this.startingPoint() === 0 ||
      this.currentIndex() > 3 ||
      this.filtered().length < 9
    ) {
      return this.currentIndex.update((i) => Math.max(i - 1, 0))
    }

    if (this.startingPoint() === 0) {
      return
    }

    this.startingPoint.update((i) => i - 1)
  }

  handleKeys(event: KeyboardEvent): void {
    const selected = this.getSelectedItem()

    const found = (selected?.actions || []).find(
      ({ key, ctrl }) => key === event.key && ctrl === event.ctrlKey,
    )

    if (found) {
      found.action()
    }
  }

  private getSelectedItem(): QuakItem {
    return this.data()[this.currentIndex()]
  }
}
