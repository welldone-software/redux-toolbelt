import EMPTY_ARRAY from 'empty/array'
import without from 'lodash.without'

// repositionItem(arr, 2, 4)
// repositionItem(arr, 2, 'start')
// repositionItem(arr, 2, 'end')
export default function repositionItem(arr, oldIndex, newIndex) {
  if (!arr || arr.length === 0) {
    return arr || EMPTY_ARRAY
  }
  const actualOldIndex = _getArrIndex(arr, oldIndex)
  const actualNewIndex = _getArrIndex(arr, newIndex)
  if (actualOldIndex === actualNewIndex) {
    return arr
  }
  const item = arr[actualOldIndex]
  const newArray = without(arr, item)

  newArray.splice(actualNewIndex, 0, item)
  return newArray
}

function _getArrIndex(arr, index) {
  switch (index) {
    case 'start':
      return 0
    case 'end':
      return arr.length - 1
    default:
      return index
  }
}
