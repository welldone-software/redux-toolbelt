import isFunction from 'lodash.isfunction'

export default function makeGetUpdatedPropsFunc(newProps) {
  return isFunction(newProps) ? newProps : () => newProps
}
