import { Injectable } from '@angular/core'
import { load, Store } from '@tauri-apps/plugin-store'

import { Settings } from './settings.model'

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private store!: Store

  private settings: Partial<Settings> = {}

  get<T extends keyof Settings>(key: T): Partial<Settings>[T] {
    return this.settings[key]
  }

  async set<T extends keyof Settings>(
    key: T,
    value: Partial<Settings>[T],
  ): Promise<void> {
    await this.store.set(key, value)
    await this.store.save()
  }

  async load<T extends keyof Settings, U extends Settings[T]>(): Promise<void> {
    this.store = await load('store.json', { autoSave: false })

    const settings = await this.store.entries()

    settings.forEach(([key, value]) => {
      this.settings[key as T] = value as U
    })
  }
}
