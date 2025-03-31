import { Component, inject } from '@angular/core'
import { LoaderStore } from 'src/app/core/stores/loader.store'

@Component({
  selector: 'app-loader',
  standalone: true,
  template: `
    @if (store.loading()) {
      <div class="progress-bar" data-testid="loader"></div>
    }
  `,
  styles: `
    .progress-bar {
      opacity: 0.5;
      position: absolute;
      width: 100%;
      height: 4px;
      background-color: var(--accent);
      animation: load 2s linear infinite;
    }

    @keyframes load {
      0% {
        transform: translateX(-100%);
      }
      100% {
        transform: translateX(100%);
      }
    }
  `,
})
export class LoaderComponent {
  protected readonly store = inject(LoaderStore)
}
