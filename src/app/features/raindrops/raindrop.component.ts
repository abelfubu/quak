import {
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core'
import { rxResource } from '@angular/core/rxjs-interop'
import { Router } from '@angular/router'
import { NgIcon, provideIcons } from '@ng-icons/core'
import { heroGlobeAlt, heroMagnifyingGlass } from '@ng-icons/heroicons/outline'
import { listen } from '@tauri-apps/api/event'

import { RaindropService } from './raindrop.service'

@Component({
  selector: 'app-raindrop',
  imports: [NgIcon],
  viewProviders: [provideIcons({ heroMagnifyingGlass, heroGlobeAlt })],
  template: `
    <div class="flex items-center text-white">
      <ng-icon name="heroMagnifyingGlass" color="#fff" size="24" />

      <input
        #queryInput
        class="pb-3 px-2 text-xl text-white w-full outline-0 mt-2"
        [value]="query()"
        (input)="[query.set(queryInput.value), currentIndex.set(0)]"
        (keyup.Enter)="accept()"
        (keyup.ArrowDown)="[$event.preventDefault(), down()]"
        (keyup.ArrowUp)="[$event.preventDefault(), up()]"
      />
    </div>

    <ul class="mt-1">
      @for (raindrop of raindrops(); track raindrop.id) {
        @let selected = $index === currentIndex();

        <li
          class="p-2 text-white rounded-lg cursor-pointer"
          [class.selected]="selected"
          (click)="[raindrop.action(), reset()]"
          (mouseenter)="currentIndex.set($index)"
        >
          <div class="flex gap-1 items-center">
            <ng-icon name="heroGlobeAlt" />
            <h3>{{ raindrop.title }}</h3>
          </div>
          <p class="text-[var(--text)] truncate">
            {{ raindrop.description }}
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
export class RaindropComponent {
  private readonly raindrop = inject(RaindropService)
  private readonly input = viewChild<ElementRef<HTMLInputElement>>('queryInput')
  private readonly router = inject(Router)

  constructor() {
    listen('tauri://focus', () => {
      this.input()?.nativeElement.focus()
    })
  }

  focusEffect = effect(() => this.input()?.nativeElement.focus())

  readonly query = signal('')
  readonly currentIndex = signal(0)

  data = rxResource({
    loader: () => this.raindrop.getRaindrops(),
  })

  raindrops = computed(() =>
    (this.data.value() || [])
      .filter(({ title, description }) =>
        normalize(`${title}${description}`).includes(normalize(this.query())),
      )
      .concat({
        title: 'Setup',
        description: 'Go to the setup page',
        action: () => this.router.navigate(['/setup']),
        id: crypto.getRandomValues(new Uint32Array(1)).at(0)!,
      })
      .slice(0, 11),
  )

  async accept(): Promise<void> {
    if (!this.raindrops().length) return

    this.raindrops()[this.currentIndex()].action()
    this.reset()
  }

  down(): void {
    this.currentIndex.update((i) =>
      Math.min(i + 1, this.raindrops().length - 1),
    )
  }

  up(): void {
    this.currentIndex.update((i) => Math.max(i - 1, 0))
  }

  reset(): void {
    this.query.set('')
    this.currentIndex.set(0)
  }
}

function normalize(source: string): string {
  return source.toLowerCase().replace(/[^a-z0-9]/g, '')
}
