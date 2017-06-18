import isArray from 'lodash.isarray'

const EMPTY_ARRAY = []

export default function addItemsCore(arr, newItems, index) {
  if (newItems !== undefined && !isArray(newItems)) {
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
