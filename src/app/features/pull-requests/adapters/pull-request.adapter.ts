import { QuakItem } from 'src/app/core/models/quak-item.model'
import { PullRequest } from '../models/pull-request.model'
import { openUrl } from '@tauri-apps/plugin-opener'

export function pullRequestAdapter(source: PullRequest): QuakItem {
  return {
    actions: [
      {
        ctrl: false,
        description: 'open',
        key: 'Enter',
        action: () =>
          openUrl(
            `https://wkeuds.visualstudio.com/NewPOL/_git/${source.repository.name}/pullrequest/${source.pullRequestId}`,
          ),
      },
    ],
    description: `${source.createdBy.displayName} opened on ${new Date(source.creationDate).toDateString()}`,
    id: source.pullRequestId,
    title: `${source.pullRequestId} ${source.title}`,
  }
}
