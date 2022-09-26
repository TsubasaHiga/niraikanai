import PageDataType from '~/types/PageDataType'

const pageData: PageDataType[] = [
  {
    path: '/index.html',
    title: 'Home',
    description: 'Home',
    ogType: 'website'
  },
  {
    path: '/example/index.html',
    title: 'Example',
    description: 'Example',
    ogType: 'website',
    hierarchy: [
      {
        title: 'Example Page',
        path: 'example/'
      }
    ]
  }
]

export const GetPageData = (): PageDataType[] => {
  // hierarchyを持っている場合は、hierarchyRealIndex(page.hierarchy.length - 1)を追加する
  // NOTE HTMLテンプレートエンジンで使用しているhandlebarsの制約上このような処理をしています（helperを使用しても難しそうでした..）。
  return pageData.map((page) => {
    if (page.hierarchy) {
      return {
        ...page,
        hierarchyRealIndex: page.hierarchy.length - 1
      }
    }
    return page
  })
}
