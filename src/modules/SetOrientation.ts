import autoBind from 'auto-bind'
import { debounce } from 'throttle-debounce'

/**
 * orientationのセットと変更を監視
 */
class SetOrientation {
  constructor() {
    autoBind(this)

    this.check()

    window.addEventListener('resize', debounce(100, this.check), false)
  }

  check() {
    const isLandscape = window.matchMedia('(orientation: landscape)').matches
    document.documentElement.dataset.orientation = isLandscape ? 'landscape' : 'portrait'
  }
}

export default SetOrientation
