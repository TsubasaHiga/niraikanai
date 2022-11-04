type HierarchyType = {
  title: string
  path: string
}

export type PageNameType = 'home' | 'example'

type PageDataType = {
  id: string // vite-plugin-handlebarsで使用する
  path: string
  pageName: PageNameType
  title: string
  description: string
  ogType: 'website' | 'article'
  hierarchy?: HierarchyType[]
  hierarchyRealIndex?: number
}

export default PageDataType
