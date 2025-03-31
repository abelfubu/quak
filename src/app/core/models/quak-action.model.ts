export interface QuakAction {
  ctrl: boolean
  description: string
  key: string
  action: () => unknown
}
