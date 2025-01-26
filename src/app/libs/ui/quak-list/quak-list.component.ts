import {
  Component,
  computed,
  inject,
  input,
  linkedSignal,
  output,
} from '@angular/core'
import { Router } from '@angular/router'
import { Fzf } from 'fzf'
import { QuakItem } from 'src/app/core/models/quak-item.model'

@Component({
  selector: 'app-quak-list',
  template: `
    <ul class="mt-1">
      @for (item of data(); track item.id) {
        @let selected = $index === currentIndex();

        <li
          class="p-2 text-white rounded-lg cursor-pointer"
          [class.selected]="selected"
          (click)="[item.action(), currentIndex.set(0), clicked.emit()]"
          (mouseenter)="currentIndex.set($index)"
        >
          <h3 class="truncate">{{ item.title }}</h3>
          <p class="text-[var(--text)] truncate">
            {{ item.description }}
          </p>
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
  private readonly router = inject(Router)

  private readonly staticItems = [
    {
      title: 'Raindrops',
      description: 'Go to Raindrops',
      action: () => this.router.navigate(['/']),
      id: crypto.getRandomValues(new Uint32Array(1)).at(0)!,
    },
    {
      title: 'Work Items',
      description: 'Go to Azure work items',
      action: () => this.router.navigate(['work-items']),
      id: crypto.getRandomValues(new Uint32Array(1)).at(0)!,
    },
    {
      title: 'Setup',
      description: 'Go to the setup page',
      action: () => this.router.navigate(['setup']),
      id: crypto.getRandomValues(new Uint32Array(1)).at(0)!,
    },
  ]

  readonly items = input.required({
    transform: (items: QuakItem[]) =>
      new Fzf(items.concat(this.staticItems), {
        normalize: true,
        selector: (item) => item.title + item.description,
      }),
  })

  readonly searchTerm = input.required<string>()

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

  triggerSelectedAction(): void {
    this.filtered()[this.currentIndex()].action()
    this.currentIndex.set(0)
  }

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
}
