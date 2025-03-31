import { openUrl } from '@tauri-apps/plugin-opener'
import { writeText } from '@tauri-apps/plugin-clipboard-manager'

import { QuakItem } from 'src/app/core/models/quak-item.model'
import { WorkItem } from '../models/work-item.model'

export function workItemAdapter(source: WorkItem): QuakItem {
  return {
    actions: [
      {
        action: () =>
          openUrl(source.url.replace('_apis/wit/workItems', '_workitems/edit')),
        description: 'open',
        ctrl: false,
        key: 'Enter',
      },
      {
        action: () => writeText(String(source.id)),
        description: 'copy',
        ctrl: true,
        key: 'y',
      },
    ],
    description: `${enrichState(source)} ${source.fields['System.AssignedTo']?.displayName || 'Unassigned'}`,
    id: source.id,
    title: `${source.id} ${source.fields['System.Title']}`,
  }
}

function enrichState(source: WorkItem): string {
  const state = source.fields['System.State']

  const map: Record<string, string> = {
    Done: '✅ ',
    'In Progress': '🚧 ',
    New: '🆕 ',
    Approved: '👍 ',
    Committed: '🔒 ',
    'To Do': '📝 ',
  }

  return `${map[state] || ''} ${state}`
}
