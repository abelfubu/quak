import {
  Component,
  effect,
  ElementRef,
  output,
  signal,
  viewChild,
} from '@angular/core'
import { NgIcon, provideIcons } from '@ng-icons/core'
import { heroMagnifyingGlass } from '@ng-icons/heroicons/outline'
import { listen } from '@tauri-apps/api/event'

@Component({
  selector: 'app-quak-search',
  imports: [NgIcon],
  viewProviders: [provideIcons({ heroMagnifyingGlass })],
  template: `
    <div class="flex items-center text-white">
      <ng-icon name="heroMagnifyingGlass" color="#fff" size="24" />

      <input
        #queryInput
        class="pb-3 px-2 text-xl text-white w-full outline-0 mt-2"
        [value]="query()"
        (input)="query.set(queryInput.value)"
        (keyup.Enter)="enter.emit()"
        (keydown.ArrowDown)="[$event.preventDefault(), down.emit()]"
        (keydown.ArrowUp)="[$event.preventDefault(), up.emit()]"
      />
    </div>
  `,
})
export class QuakSearchComponent {
  readonly query = signal<string>('')
  readonly down = output<void>()
  readonly up = output<void>()
  readonly enter = output<void>()

  private readonly input = viewChild<ElementRef<HTMLInputElement>>('queryInput')

  constructor() {
    listen('tauri://focus', () => this.focus())
  }

  focusEffect = effect(() => this.focus())

  private focus(): void {
    this.input()?.nativeElement.focus()
  }
}
