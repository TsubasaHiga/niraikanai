import autoBind from 'auto-bind'
import { debounce } from 'throttle-debounce'

import GetEventPaths from '~/utils/getEventPaths'
import IsScrollable from '~/utils/isScrollable'

/**
 * ホイールで横スクロールを追加
 */
class AddHorizontalScrollWithWheel {
  elements: HTMLElement[]
  constructor() {
    autoBind(this)
    this.elements = []

    window.addEventListener('resize', debounce(150, this.resize), false)
  }

  reInit(): void {
    this.removeEventListener()

    const targetElements = document.querySelectorAll('[data-horizontal-scroll]') as NodeListOf<HTMLElement>
    if (targetElements.length <= 0) return

    // scrollableなelementを取得
    targetElements.forEach((element) => {
      if (!IsScrollable(element)) return
      this.elements.push(element)
    })

    this.addEventListener()
  }

  addEventListener(): void {
    if (this.elements.length <= 0) return
    this.elements.forEach((element) => element.addEventListener('wheel', this.onWheel, { passive: false }))
  }

  removeEventListener(): void {
    if (this.elements.length <= 0) return
    this.elements.forEach((element) => element.removeEventListener('wheel', this.onWheel))
  }

  onWheel(e: WheelEvent): void {
    e.preventDefault()

    // eventPathsを取得
    const elementPaths = GetEventPaths(e) as HTMLElement[]

    // elementPathsからデータ属性（'[data-horizontal-scroll]'）の要素を取得
    const element = elementPaths.filter((path) => {
      if (path.nodeType !== 1) return false
      return typeof path.dataset.horizontalScroll !== 'undefined'
    })[0]

    element.scrollLeft += e.deltaY
  }

  resize(): void {
    this.reInit()
  }
}

export default AddHorizontalScrollWithWheel
