type HierarchyType = {
  title: string
  path: string
}

type PageDataType = {
  path: string
  title: string
  description: string
  ogType: 'website' | 'article'
  hierarchy?: HierarchyType[]
  hierarchyRealIndex?: number
}

export default PageDataType
