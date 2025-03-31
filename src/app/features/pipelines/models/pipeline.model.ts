export interface Pipeline {
  _links: {
    self: {
      href: string
    }
    web: {
      href: string
    }
  }
  url: string
  id: number
  revision: number
  name: string
  folder: string
}
