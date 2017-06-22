import EMPTY_ARRAY from 'empty/array'
import defaultIdSelector from './defaultIdSelector'
import isMatch from 'lodash.ismatch'

// updateItemsById(arr, [{id: 'id_1', prop: 3, prop2: 'val'}])
// updateItemsById(arr, [{id: 'id_1', prop: 3, prop2: 'val'}], item => item.id)
export default function updateItemsById(arr, updatedItems, idSelector = defaultIdSelector) {
  if (!updatedItems || updatedItems.length === 0) {
    return arr || EMPTY_ARRAY
  }
  const updatedItemsMap = new Map(updatedItems.map(item => [idSelector(item), item]))

  let hasChanges = false
  const result = arr.map(item => {
    const itemId = idSelector(item)
    if (!updatedItemsMap.has(itemId)) {
      return item
    }
    const updatedItem = updatedItemsMap.get(itemId)
    if (isMatch(item, updatedItem)) {
      return item
    }
    hasChanges = true
    return {...item, ...updatedItem}
  })

  return hasChanges ? result : arr
}
