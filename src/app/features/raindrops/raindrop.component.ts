import {
  Component,
  computed,
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
import { load } from '@tauri-apps/plugin-store'
import { RaindropService } from '../../raindrop.service'

@Component({
  selector: 'app-raindrop',
  imports: [NgIcon],
  viewProviders: [provideIcons({ heroMagnifyingGlass, heroGlobeAlt })],
  template: `
    <div class="flex items-center justify-center h-16 text-white">
      <ng-icon
        name="heroMagnifyingGlass"
        color="#9CABBA"
        size="24"
        class="mt-4"
      />

      <div class="flex-col flex-grow">
        <small class="ml-1">Search</small>
        <input
          autofocus
          #queryInput
          class="pb-3 px-2 rounded-t-md text-xl text-white w-full outline-0"
          (input)="query.set(queryInput.value)"
          (keyup.Enter)="accept()"
          (keyup.ArrowDown)="down()"
          (keyup.ArrowUp)="up()"
        />
      </div>
    </div>

    <ul class="z-5 mt-2">
      @for (raindrop of raindrops(); track raindrop.id) {
        @let selected = $index === currentIndex();

        <li class="p-2 text-white rounded-lg" [class.selected]="selected">
          <div class="flex gap-1 items-center">
            <ng-icon name="heroGlobeAlt" />
            <h3>{{ raindrop.title }}</h3>
          </div>
          <p class="text-[#9CABBA] truncate">{{ raindrop.description }}</p>
        </li>
      }
    </ul>
  `,
  styles: `
    .selected {
      background-color: #16202b;

      h3 {
        color: #55ddff;
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

  async accept() {
    if (this.query().split(' ')[0] === 'token') {
      const store = await load('store.json', { autoSave: false })
      await store.set('raindrop-token', { value: this.query().split(' ')[1] })
      await store.save()
      return
    }

    if (!this.raindrops().length) return

    this.raindrops()[this.currentIndex()].action()
  }

  down() {
    console.log('CURRENT', this.currentIndex())
    this.currentIndex.update((i) =>
      Math.min(i + 1, this.raindrops().length - 1),
    )
    console.log('AFTER', this.currentIndex())
  }

  up() {
    this.currentIndex.update((i) => Math.max(i - 1, 0))
  }
}

function normalize(source: string): string {
  return source.toLowerCase().replace(/[^a-z0-9]/g, '')
}
