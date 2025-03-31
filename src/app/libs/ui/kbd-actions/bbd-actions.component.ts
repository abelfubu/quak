import { TitleCasePipe } from '@angular/common'
import { Component, input } from '@angular/core'
import { QuakAction } from 'src/app/core/models/quak-action.model'
import { KbdComponent } from '../kbd/kbd.component'

@Component({
  selector: 'app-kbd-actions',
  imports: [TitleCasePipe, KbdComponent],
  template: `
    <div
      class="flex gap-2 absolute right-2 top-0 bottom-0 bg-[var(--bg-primary)] p-1"
    >
      @for (action of actions(); track action.key) {
        <span class="flex flex-col items-center gap-1">
          <small class="text-gray-500">{{ action.description }}</small>
          <div class="flex items-center justify-center gap-1">
            @if (action.ctrl) {
              <kbd app-kbd>C</kbd>
            }

            <kbd app-kbd>{{ action.key.at(0) | titlecase }}</kbd>
          </div>
        </span>
      }
    </div>
  `,
})
export class KbdActionsComponent {
  readonly actions = input.required<QuakAction[]>()
}
