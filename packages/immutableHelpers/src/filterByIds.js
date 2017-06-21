import EMPTY_ARRAY from 'empty/array'
import defaultIdSelector from './defaultIdSelector'

// filterByIds(arr, ['id_1', 'id_2'])
// filterByIds(arr, ['id_1', 'id_2'], item => item.id)
export default function filterByIds(arr, itemsIds, idSelector = defaultIdSelector) {
  if (!arr || arr.length === 0 || !itemsIds) {
    return arr || EMPTY_ARRAY
  }
  if (itemsIds.length === 0) {
    return EMPTY_ARRAY
  }
  const filteredArr = arr.filter(item => itemsIds.includes(idSelector(item)))
  return filteredArr.length === arr.length ? arr : filteredArr
}
