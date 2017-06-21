import _addItemsCore from './_addItemsCore'

export default function unshiftItems(arr, newItems) {
  return _addItemsCore(arr, newItems, 0)
}
