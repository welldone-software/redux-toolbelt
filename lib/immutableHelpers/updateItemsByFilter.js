import isMatch from 'lodash.ismatch'
import makeGetUpdatedPropsFunc from '../_internal/makeGetUpdatedPropsFunc'

// updateItemsByFilter(arr, item => item.flag, {prop1: 'new value', prop2: 'new value'}) {
// updateItemsByFilter(arr, item => item.flag, item => ({prop: item.prop+2, prop2: 'new value'}))
export default function updateItemsByFilter(arr, filter, newProps) {
  const getUpdatedProps = makeGetUpdatedPropsFunc(newProps)

  let hasChanges = false
  const result = arr.map(item => {
    if (!filter(item)) {
      return item
    }
    const updatedProps = getUpdatedProps(item)
    if (isMatch(item, updatedProps)) {
      return item
    }
    hasChanges = true
    return {...item, ...updatedProps}
  })

  return hasChanges ? result : arr
}
