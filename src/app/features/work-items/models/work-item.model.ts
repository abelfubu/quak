export interface WorkItem {
  id: number
  rev: number
  fields: Fields
  url: string
}

export interface Fields {
  'System.AreaPath': string
  'System.TeamProject': string
  'System.IterationPath': string
  'System.WorkItemType': string
  'System.State': string
  'System.Reason': string
  'System.CreatedDate': string
  'System.CreatedBy': SystemCreatedBy
  'System.ChangedDate': string
  'System.ChangedBy': SystemCreatedBy
  'System.CommentCount': number
  'System.Title': string
  'System.AssignedTo': SystemCreatedBy
  'System.BoardColumn': string
  'System.BoardColumnDone': boolean
  'Microsoft.VSTS.Common.Priority': number
  'Microsoft.VSTS.Common.BacklogPriority': number
  'Microsoft.VSTS.Common.StateChangeDate': string
  'Microsoft.VSTS.Common.Severity': string
  'Microsoft.VSTS.Common.ValueArea': string
  'WEF_7C19E503AEAB4F81BD24057784886A09_Kanban.Column': string
  'WEF_7C19E503AEAB4F81BD24057784886A09_Kanban.Column.Done': boolean
  'WEF_B100187EF5B544299FC41F824DE3F6E8_Kanban.Column': string
  'WEF_B100187EF5B544299FC41F824DE3F6E8_Kanban.Column.Done': boolean
  'WEF_13922245DEB1454E8E59AAED489ED877_Kanban.Column': string
  'WEF_13922245DEB1454E8E59AAED489ED877_Kanban.Column.Done': boolean
  'WEF_4E6702E7440142F1BF43717917021409_Kanban.Column': string
  'WEF_4E6702E7440142F1BF43717917021409_Kanban.Column.Done': boolean
  'WEF_918157785B5B455DADF03D0F32A69973_Kanban.Column': string
  'WEF_918157785B5B455DADF03D0F32A69973_Kanban.Column.Done': boolean
  'Microsoft.VSTS.TCM.ReproSteps': string
}

interface SystemCreatedBy {
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
