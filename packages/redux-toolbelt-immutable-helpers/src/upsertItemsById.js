import EMPTY_ARRAY from 'empty/array'
import isArray from 'lodash.isarray'
import isMatch from 'lodash.ismatch'
import defaultIdSelector from './defaultIdSelector'

// upsertItemsById(arr, [{id: 'id_1', prop: 3, prop2: 'val'}])
// upsertItemsById(arr, [{id: 'id_1', prop: 3, prop2: 'val'}], item => item.id)
export default function upsertItemsById(arr, updatedItems, idSelector = defaultIdSelector) {
  if (!updatedItems || updatedItems.length === 0) {
    return arr || EMPTY_ARRAY
  }
  if (!arr) {
    return updatedItems || EMPTY_ARRAY
  }

  updatedItems = isArray(updatedItems) ? updatedItems : [updatedItems]

  const updatedItemsMap = new Map(updatedItems.map(item => [idSelector(item), item]))

  let hasChanges = false
  const result = arr.map(item => {
    const itemId = idSelector(item)
    if (!updatedItemsMap.has(itemId)) {
      return item
    }
    const updatedItem = updatedItemsMap.get(itemId)
    updatedItemsMap.delete(itemId)
    if (isMatch(item, updatedItem)) {
      return item
    }
    hasChanges = true
    return {...item, ...updatedItem}
  })
  updatedItemsMap.forEach(item => result.push(item))

  return hasChanges ? result : arr
}
