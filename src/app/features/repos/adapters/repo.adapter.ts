import { QuakItem } from 'src/app/core/models/quak-item.model'
import { Repo } from '../models/repo.model'
import { openUrl } from '@tauri-apps/plugin-opener'

export function repoAdapter(source: Repo): QuakItem {
  return {
    actions: [
      {
        action: () => openUrl(source.webUrl),
        description: 'open',
        ctrl: false,
        key: 'Enter',
      },
    ],
    description: source.project.name,
    id: crypto.getRandomValues(new Uint32Array(1)).at(0)!,
    title: source.name,
  }
}
