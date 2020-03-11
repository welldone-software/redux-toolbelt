import {isFunction} from 'lodash'
import {constant} from 'lodash'

// updateObjectProperty(obj, prop, newVal)
// updateObjectProperty(obj, prop, updateFunc)
export default function updateObjectProperty(obj, prop, val) {
  const updateFunc = isFunction(val) ? val : constant(val)

  const oldVal = obj[prop]
  const newVal = updateFunc(oldVal)

  return oldVal === newVal ? obj : {
    ...obj,
    [prop]: newVal,
  }
}
