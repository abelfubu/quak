export interface Release {
  artifacts: null
  comment: null
  createdBy: EdBy
  createdFor: CreatedFor
  createdOn: Date
  definitionSnapshotRevision: number
  description: string
  environments: null
  id: number
  keepForever: boolean
  logsContainerUrl: string
  modifiedBy: EdBy
  modifiedOn: Date
  name: string
  poolName: null
  projectReference: ProjectReference
  properties: Properties
  reason: Reason
  releaseDefinition: ReleaseDefinition
  releaseDefinitionRevision: number
  releaseNameFormat: ReleaseNameFormat
  status: Status
  tags: any[]
  triggeringArtifactAlias: null
  url: string
  variableGroups: any[]
  variables: Properties
}

export interface EdBy {
  descriptor: string
  directoryAlias: null
  displayName: string
  id: string
  imageUrl: null | string
  inactive: null
  isAadIdentity: null
  isContainer: boolean | null
  isDeletedInOrigin: null
  profileUrl: null
  uniqueName: string
  url: null | string
}

export interface CreatedFor {
  _links?: Links
  descriptor: string
  displayName: string
  id: string
  imageUrl?: string
  isContainer?: boolean
  uniqueName: string
  url?: string
}

export interface Links {
  avatar: Avatar
}

export interface Avatar {
  href: string
}

export interface ProjectReference {
  id: string
  name: Name
}

export enum Name {
  NewPOL = 'NewPOL',
}

export interface Properties {}

export enum Reason {
  ContinuousIntegration = 'continuousIntegration',
  Manual = 'manual',
  Schedule = 'schedule',
}

export interface ReleaseDefinition {
  id: number
  name: string
  path: Path
  projectReference: null
  url: string
  _links: {
    web: { href: string }
  }
}

export enum Path {
  A3FacturaDeploys = '\\a3factura\\Deploys',
  A3FacturaDeploysOLD = '\\a3factura\\Deploys\\_OLD',
  A3InnuvaDoc = '\\A3InnuvaDoc',
  AreaCliente = '\\AreaCliente',
  RegresionFuncional = '\\RegresionFuncional',
}

export enum ReleaseNameFormat {
  ReleaseRevR = 'Release-$(rev:r)',
}

export enum Status {
  Active = 'active',
}
