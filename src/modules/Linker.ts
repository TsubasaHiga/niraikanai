import autoBind from 'auto-bind'

/**
 * '[data-link]'が付与された要素をクリックした際に、リンク遷移を行います
 */
class Linker {
  constructor() {
    autoBind(this)

    const elements = document.querySelectorAll('[data-link]')

    if (elements.length <= 0) {
      return
    }

    elements.forEach((element) => {
      element.addEventListener('click', this.searchLinkTag, false)
    })
  }

  searchLinkTag(e: Event): void {
    const element = e.target as HTMLElement

    // aタグの時は無視
    if (element?.nodeName === 'A') {
      return
    }

    const link = (e.currentTarget as HTMLElement).dataset.link

    if (!link) {
      return
    }

    window.location.href = link
  }
}

export default Linker
