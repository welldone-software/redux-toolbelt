import EMPTY_ARRAY from 'empty/array'
import isMatch from 'lodash.ismatch'
import defaultIdSelector from './defaultIdSelector'

// upsertItemsById(arr, [{id: 'id_1', prop: 3, prop2: 'val'}])
// upsertItemsById(arr, [{name: 'id_1', prop: 3, prop2: 'val'}], item => item.name)
export default function upsertItemsById(arr, updatedItems, idSelector = defaultIdSelector) {
  if (!updatedItems || updatedItems.length === 0) {
    return arr || EMPTY_ARRAY
  }

  updatedItems = Array.isArray(updatedItems) ? updatedItems : [updatedItems]

  if (!arr) {
    return updatedItems || EMPTY_ARRAY
  }

  const updatedItemsMap = new Map(updatedItems.map(item => [idSelector(item), item]))

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
    return {...item, ...updatedItem}
  })

  if (updatedItemsMap.size === 0) {
    return result
  }

  updatedItemsMap.forEach(item => result.push(item))
  return result
}
