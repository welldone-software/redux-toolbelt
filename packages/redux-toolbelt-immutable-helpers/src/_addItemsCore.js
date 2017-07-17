import EMPTY_ARRAY from 'empty/array'

export default function _addItemsCore(arr, newItems, index) {
  if (newItems !== undefined && !Array.isArray(newItems)) {
    newItems = [newItems]
  }
  if (newItems === undefined || newItems.length === 0) {
    return arr || EMPTY_ARRAY
  }
  if (!arr || arr.length == 0) {
    return newItems
  }

  if(index === Number.MAX_VALUE){
    return [...arr, ...newItems]
  }

  if(index <= 0){
    return [...newItems, ...arr]
  }

  return [
    ...arr.slice(0, index),
    ...newItems,
    ...arr.slice(index),
  ]

}
