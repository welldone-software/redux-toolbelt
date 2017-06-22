import _addItemsCore from './_addItemsCore'

export default function addItemsInIndex(arr, index, newItems) {
  return _addItemsCore(arr, newItems, index)
}
