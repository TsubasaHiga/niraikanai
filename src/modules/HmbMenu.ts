import autoBind from 'auto-bind'
import { debounce } from 'throttle-debounce'

import { elements } from '~/const/elements'

import GetDeviceType from '../utils/getDeviceType'
import Pd from '../utils/preventDefault'

class HmbMenu {
  isActive: boolean
  deviceType: string

  hmb: HTMLElement | null
  hmbBg: HTMLElement | null

  constructor() {
    autoBind(this)

    this.isActive = false
    this.deviceType = GetDeviceType()

    this.hmb = document.querySelector('#hmb')
    this.hmbBg = document.querySelector('#hmb-bg')

    this.hmb?.addEventListener('click', this.switchShowHide, false)
    this.hmbBg?.addEventListener('click', this.switchShowHide, false)
    window.addEventListener('resize', debounce(150, this.resize), false)
  }

  show(): void {
    this.isActive = true

    elements.NAV.style.visibility = ''
    document.documentElement.classList.add('is-nav-active')

    elements.MAIN?.addEventListener('touchmove', Pd, { passive: false })
    elements.MAIN?.addEventListener('wheel', Pd, { passive: false })
  }

  hide(): void {
    this.isActive = false

    document.documentElement.classList.remove('is-nav-active')

    elements.MAIN?.removeEventListener('touchmove', Pd)
    elements.MAIN?.removeEventListener('wheel', Pd)
  }

  switchShowHide(): void {
    this.isActive ? this.hide() : this.show()
  }

  resize(): void {
    if (this.deviceType === GetDeviceType()) {
      return
    }

    this.deviceType = GetDeviceType()
    this.hide()

    if (this.deviceType === 'lg') {
      elements.NAV.style.visibility = ''
    }
  }
}

export default HmbMenu
