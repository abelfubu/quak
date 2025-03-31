export interface PullRequest {
  repository: Repository
  pullRequestId: number
  codeReviewId: number
  status: string
  createdBy: CreatedBy
  creationDate: string
  title: string
  sourceRefName: string
  targetRefName: string
  mergeStatus: string
  isDraft: boolean
  mergeId: string
  lastMergeSourceCommit: LastMergeSourceCommit
  lastMergeTargetCommit: LastMergeSourceCommit
  lastMergeCommit: LastMergeSourceCommit
  reviewers: Reviewer[]
  url: string
  supportsIterations: boolean
}

interface Reviewer {
  reviewerUrl: string
  vote: number
  hasDeclined: boolean
  isFlagged: boolean
  displayName: string
  url: string
  _links: Links
  id: string
  uniqueName: string
  imageUrl: string
}

interface LastMergeSourceCommit {
  commitId: string
  url: string
}

interface CreatedBy {
  displayName: string
  url: string
  _links: Links
  id: string
  uniqueName: string
  imageUrl: string
  descriptor: string
}

interface Links {
  avatar: Avatar
}

interface Avatar {
  href: string
}

interface Repository {
  id: string
  name: string
  url: string
  project: Project
}

interface Project {
  id: string
  name: string
  state: string
  visibility: string
  lastUpdateTime: string
}
