export interface Repo {
  id: string
  name: string
  url: string
  project: Project
  defaultBranch: string
  size: number
  remoteUrl: string
  sshUrl: string
  webUrl: string
  isDisabled: boolean
  isInMaintenance: boolean
}

interface Project {
  id: string
  name: string
  url: string
  state: string
  revision: number
  visibility: string
  lastUpdateTime: string
}
