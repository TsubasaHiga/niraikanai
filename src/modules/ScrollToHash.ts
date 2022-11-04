import GetDeviceType from '~/utils/getDeviceType'

/**
 * 特定のハッシュ先にスクロール（Promise対応版）
 */
const ScrollToHash = async (hash: string, manualOffset?: number): Promise<boolean> => {
  const targetElement = document.querySelector(hash)
  if (!targetElement) return false

  const elementPosY = targetElement.getBoundingClientRect().top + window.pageYOffset

  // manualOffsetがある場合はmanualOffsetを、ない場合は、LGサイズの時はヘッダーの高さを取得
  const offset = manualOffset
    ? manualOffset
    : GetDeviceType() === 'lg'
    ? document.getElementById('nav')?.clientHeight || 0
    : 0
  const posY = elementPosY - offset

  window.scrollTo({
    top: posY,
    behavior: 'smooth'
  })

  return new Promise((resolve) => {
    const rejectTimer = setTimeout(() => {
      window.removeEventListener('scroll', scrollHandler)
      resolve(false)
    }, 1000)

    const scrollHandler = () => {
      if (window.pageYOffset !== posY) return

      window.removeEventListener('scroll', scrollHandler)
      clearTimeout(rejectTimer)
      resolve(true)
    }

    if (window.pageYOffset === posY) {
      clearTimeout(rejectTimer)
      resolve(true)
    }

    if (window.pageYOffset !== posY) {
      window.addEventListener('scroll', scrollHandler, false)
    }
  })
}

export default ScrollToHash
