import { openUrl } from '@tauri-apps/plugin-opener'
import { QuakItem } from 'src/app/core/models/quak-item.model'
import { WorkItem } from '../models/work-item.model'

export function workItemAdapter(source: WorkItem): QuakItem {
  return {
    id: source.id,
    title: `${source.id}: ${source.fields['System.Title']}`,
    description: `${source.fields['System.State']} ${source.fields['System.AssignedTo']?.displayName || 'Unassigned'}`,
    action: () =>
      openUrl(source.url.replace('_apis/wit/workItems', '_workitems/edit')),
  }
}
