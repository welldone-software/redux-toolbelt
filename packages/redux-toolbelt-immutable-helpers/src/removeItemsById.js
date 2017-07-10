import EMPTY_ARRAY from 'empty/array'
import defaultIdSelector from './defaultIdSelector'

// removeItemsById(arr, [{id: 'id_1'}, {id: 'id_2'}])
// removeItemsById(arr, [{id: 'id_1'}, {id: 'id_2'}], item => item.id)
export default function removeItemsById(arr, itemsToDelete, idSelector = defaultIdSelector) {
  if (!arr || arr.length === 0) {
    return arr || EMPTY_ARRAY
  }
  const idsToDelete = itemsToDelete.map(idSelector)
  const newArray = arr.filter(item => !idsToDelete.includes(idSelector(item)))
  return arr.length === newArray.length ? arr : newArray
}
