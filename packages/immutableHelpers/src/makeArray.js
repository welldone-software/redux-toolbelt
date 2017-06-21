import concat from 'lodash.concat'

export default function makeArray(arrayOrObject) {
  // Converts the object into array (if it's not an array already)
  return concat(arrayOrObject)
}
