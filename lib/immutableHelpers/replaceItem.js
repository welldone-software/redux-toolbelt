// replaceItem(arr, 2, newItem)
export default function replaceItem(arr, index, newItem) {
  return [
    ...arr.slice(0, index),
    newItem,
    ...arr.slice(index + 1),
  ]
}
