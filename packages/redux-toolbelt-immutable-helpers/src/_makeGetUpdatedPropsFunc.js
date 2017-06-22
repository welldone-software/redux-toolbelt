import isFunction from 'lodash.isfunction'

export default function _makeGetUpdatedPropsFunc(newProps) {
  return isFunction(newProps) ? newProps : () => newProps
}
