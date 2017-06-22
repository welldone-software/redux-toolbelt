import _addItemsCore from './_addItemsCore'

export default function pushItems(arr, newItems) {
  return _addItemsCore(arr, newItems, Number.MAX_VALUE)
}
