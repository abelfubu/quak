import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core'
import { rxResource } from '@angular/core/rxjs-interop'
import { openUrl } from '@tauri-apps/plugin-opener'
import { RaindropService } from './raindrop.service'
import { getCurrentWebviewWindow } from '@tauri-apps/api/webviewWindow'
import { listen } from '@tauri-apps/api/event'
import { NgIcon, provideIcons } from '@ng-icons/core'
import { heroMagnifyingGlass } from '@ng-icons/heroicons/outline'
import { load } from '@tauri-apps/plugin-store'

@Component({
  selector: 'app-root',
  imports: [CommonModule, NgIcon],
  viewProviders: [provideIcons({ heroMagnifyingGlass })],
  template: `
    <main class="rounded w-full h-full">
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
            <h3>{{ raindrop.title }}</h3>
            <p class="text-[#9CABBA]">{{ raindrop.url }}</p>
          </li>
        }
      </ul>
    </main>
  `,
  styles: `
    .selected {
      background-color: #16202b;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private readonly raindrop = inject(RaindropService)
  private readonly input = viewChild<ElementRef<HTMLInputElement>>('queryInput')

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
      .filter((r) => `${r.title}${r.url}`.includes(this.query()))
      .slice(0, 10),
  )

  async accept() {
    if (this.query().split(' ')[0] === 'token') {
      const store = await load('store.json', { autoSave: false })
      await store.set('raindrop-token', { value: this.query().split(' ')[1] })
      await store.save()
    }

    const url = this.raindrops()[this.currentIndex()].url
    openUrl(url).then(() => getCurrentWebviewWindow().destroy())
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
