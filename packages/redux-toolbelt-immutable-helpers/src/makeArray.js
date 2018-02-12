import concat from 'lodash.concat'
import isArray from 'lodash.isarray'

export default function makeArray(arrayOrObject) {
  return isArray(arrayOrObject) ? arrayOrObject : concat(arrayOrObject)
}
