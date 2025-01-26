import { Injectable } from '@angular/core'
import { load, Store } from '@tauri-apps/plugin-store'

import { Settings } from './settings.model'

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private store!: Store

  private settings: Partial<Settings> = {
    raindropToken: '',
  }

  constructor() {}

  get<T extends keyof Settings>(key: T): Partial<Settings>[T] {
    return this.settings[key]
  }

  set<T extends keyof Settings>(key: T, value: Partial<Settings>[T]): void {
    this.store.set(key, value)
  }

  async load<T extends keyof Settings, U extends Settings[T]>(): Promise<void> {
    this.store = await load('store.json', { autoSave: false })

    const settings = await this.store.entries()

    settings.forEach(([key, value]) => {
      this.settings[key as T] = value as U
    })
  }
}
