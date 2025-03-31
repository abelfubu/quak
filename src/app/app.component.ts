import { Component, inject } from '@angular/core'
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router'
import { listen } from '@tauri-apps/api/event'
import { getCurrentWebviewWindow } from '@tauri-apps/api/webviewWindow'
import { LoaderComponent } from './libs/ui/loader/loader.component'
import { NAVIGATION_ITEMS } from './core/tokens/navigation-items.token'

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, LoaderComponent],
  template: `
    <app-loader />
    <nav class="mt-2">
      <ul class="flex gap-2">
        @for (tab of tabs; track tab.id) {
          <li
            [routerLink]="tab.path"
            class="text-gray-400 text-sm p-2 rounded cursor-pointer hover:text-blue-200"
            [routerLinkActive]="['bg-[var(--bg-primary)]', 'text-white']"
          >
            {{ tab.title }}
          </li>
        }
      </ul>
    </nav>

    <router-outlet />
  `,
  host: { '(keyup.Esc)': 'close()' },
  styles: `
    :host {
      background-color: var(--bg-dark);
      border-radius: 1rem;
      box-shadow: 0 0 1rem rgba(0, 0, 0, 0.5);
      display: block;
      margin: 1rem;
      max-height: 700px;
      overflow: hidden;
      padding: 0 0.5rem 1rem;
      position: relative;
    }
  `,
})
export class AppComponent {
  private readonly router = inject(Router)
  protected readonly tabs = inject(NAVIGATION_ITEMS)

  constructor() {
    listen('tauri://blur', () => {
      this.close()
    })

    listen('tauri://focus', () =>
      this.router.navigate(['/'], { onSameUrlNavigation: 'reload' }),
    )
  }

  close() {
    getCurrentWebviewWindow().hide()
  }
}
