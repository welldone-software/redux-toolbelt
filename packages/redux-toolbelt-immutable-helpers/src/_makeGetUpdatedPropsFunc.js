import {isFunction} from 'lodash'

export default function _makeGetUpdatedPropsFunc(newProps) {
  return isFunction(newProps) ? newProps : () => newProps
}
