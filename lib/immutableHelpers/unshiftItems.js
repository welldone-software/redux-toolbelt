import addItemsCore from '../_internal/addItemsCore'

export default function unshiftItems(arr, newItems) {
  return addItemsCore(arr, newItems, 0)
}
