/**
 * 特定の要素上で横スクロール（Promise対応版）
 */
const ScrollToLeftOnElement = async (element: HTMLElement, left: number): Promise<boolean> => {
  element.scrollTo({
    left: left,
    behavior: 'smooth'
  })

  return new Promise((resolve) => {
    const rejectTimer = setTimeout(() => {
      console.log('rejectTimer')
      element.removeEventListener('scroll', scrollHandler)
      resolve(false)
    }, 500)

    const scrollHandler = () => {
      if (element.scrollLeft !== left) return

      element.removeEventListener('scroll', scrollHandler)
      clearTimeout(rejectTimer)
      resolve(true)
    }

    if (element.scrollLeft === left) {
      console.log('clearTimeout')
      clearTimeout(rejectTimer)
      resolve(true)
    }

    if (element.scrollLeft !== left) {
      element.addEventListener('scroll', scrollHandler, false)
    }
  })
}

export default ScrollToLeftOnElement
