export default function removeItem(arr, index) {
  return index > arr.length - 1 ? arr : [
    ...arr.slice(0, index),
    ...arr.slice(index + 1),
  ]
}
