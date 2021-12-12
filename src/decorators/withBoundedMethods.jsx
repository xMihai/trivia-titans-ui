import autoBind from 'auto-bind'

function withBoundedMethods(constructor) {
  return class extends constructor {
    constructor(...args) {
      super(...args)
      autoBind(this)
    }
  }
}

export default withBoundedMethods
