import { QuakAction } from './quak-action.model'

export interface QuakItem {
  id: number
  title: string
  description: string
  actions: QuakAction[]
}
