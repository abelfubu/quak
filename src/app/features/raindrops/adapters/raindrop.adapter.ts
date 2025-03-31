import { getCurrentWebviewWindow } from '@tauri-apps/api/webviewWindow'
import { openUrl } from '@tauri-apps/plugin-opener'
import { QuakItem } from 'src/app/core/models/quak-item.model'
import { Raindrop } from '../models/raindrop.model'

export function raindropAdapter(source: Raindrop): QuakItem {
  return {
    actions: [
      {
        ctrl: false,
        key: 'Enter',
        description: 'open',
        action: () => {
          openUrl(source.link)
          getCurrentWebviewWindow().hide()
        },
      },
    ],
    description: source.link,
    id: source._id,
    title: source.title,
  }
}
