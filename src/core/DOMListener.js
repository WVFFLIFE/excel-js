import {capitalizeFirstLetter} from '@core/utils'

export default class DOMListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error(`No $root provided DOMListener`)
    }
    this.$root = $root
    this.listeners = listeners
  }

  initDOMListeners() {
    this.listeners.forEach(listener => {
      const method = getMethodName(listener)
      if (!this[method]) {
        throw new Error(
            `Method ${method} is not implemented in ${this.name} Component`
        )
      }
      this.$root.on(listener, this[method].bind(this))
    })
  }

  removeDOMListeners() {
    this.listeners.forEach(listener => {
      const method = getMethodName(listener)
      if (!this[method]) {
        throw new Error(
            `Method ${method} is not implemented in ${this.name} Component`
        )
      }
      this.$root.off(listener, this[method].bind(this))
    })
  }
}

function getMethodName(eventName) {
  return 'on' + capitalizeFirstLetter(eventName)
}
