import { Injectable, signal } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class LoaderStore {
  private readonly _loading = signal(false)
  readonly loading = this._loading.asReadonly()

  setLoading(loading: boolean): void {
    this._loading.set(loading)
  }
}
