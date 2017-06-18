import addItemsCore from '../_internal/addItemsCore'

export default function addItemsInIndex(arr, index, newItems) {
  return addItemsCore(arr, newItems, index)
}
