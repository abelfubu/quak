import { Component } from '@angular/core'
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router'
import { listen } from '@tauri-apps/api/event'
import { getCurrentWebviewWindow } from '@tauri-apps/api/webviewWindow'

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <nav>
      <ul class="flex gap-2">
        @for (tab of tabs; track tab.id) {
          <li
            [routerLink]="tab.path"
            class="text-gray-400 text-sm p-2 rounded cursor-pointer hover:text-blue-200"
            [routerLinkActive]="['bg-[var(--bg-primary)]', 'text-white']"
            [routerLinkActiveOptions]="{ exact: true }"
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
      display: block;
      margin: 1rem;
      background-color: #1a1a1a;
      padding: 0.5rem 0.5rem 1rem;
      border-radius: 1rem;
      box-shadow: 0 0 1rem rgba(0, 0, 0, 0.5);
      overflow: hidden;
      max-height: 700px;
    }
  `,
})
export class AppComponent {
  protected readonly tabs = [
    { title: 'Raindrops', path: '/' },
    { title: 'Settings', path: '/setup' },
    { title: 'Work Items', path: '/work-items' },
  ].map((t) => ({ ...t, id: crypto.randomUUID() }))

  constructor() {
    listen('tauri://blur', () => {
      this.close()
    })
  }

  close() {
    getCurrentWebviewWindow().hide()
  }
}
