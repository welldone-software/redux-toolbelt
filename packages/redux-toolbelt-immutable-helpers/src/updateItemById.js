import EMPTY_ARRAY from 'empty/array'
import defaultIdSelector from './defaultIdSelector'
import updateItem from './updateItem'

// updateItemById(arr, 2, {prop1: 'new value', prop2: 'new value'})
// updateItemById(arr, 2, {prop1: 'new value', prop2: 'new value'}, item => item.id)
// updateItemById(arr, 2, item => ({prop: item.prop+2, prop2: 'new value'}))
// updateItemById(arr, 2, item => ({prop: item.prop+2, prop2: 'new value'}), item => item.id)
export default function updateItemById(arr, id, newProps, idSelector = defaultIdSelector) {
  if (!arr || arr.length === 0) {
    return arr || EMPTY_ARRAY
  }
  const index = arr.findIndex(item => idSelector(item) === id)
  return updateItem(arr, index, newProps)
}
