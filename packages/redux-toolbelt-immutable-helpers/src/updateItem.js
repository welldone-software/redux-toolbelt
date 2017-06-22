import inRange from 'lodash.inrange'
import isMatch from 'lodash.ismatch'
import EMPTY_ARRAY from 'empty/array'
import _makeGetUpdatedPropsFunc from './_makeGetUpdatedPropsFunc'

// updateItem(arr, 2, {prop1: 'new value', prop2: 'new value'})
// updateItem(arr, 2, item => ({prop: item.prop+2, prop2: 'new value'}))
export default function updateItem(arr, index, newProps) {
  if (!arr || !inRange(index, arr.length)) {
    return arr || EMPTY_ARRAY
  }
  const item = arr[index]
  const updatedProps = _makeGetUpdatedPropsFunc(newProps)(item)

  return isMatch(item, updatedProps) ? arr : [
    ...arr.slice(0, index),
    {
      ...item,
      ...updatedProps,
    },
    ...arr.slice(index + 1),
  ]
}
