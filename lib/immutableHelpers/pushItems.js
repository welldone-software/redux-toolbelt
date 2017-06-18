import addItemsCore from '../_internal/addItemsCore'

export default function pushItems(arr, newItems) {
  return addItemsCore(arr, newItems, Number.MAX_VALUE)
}
