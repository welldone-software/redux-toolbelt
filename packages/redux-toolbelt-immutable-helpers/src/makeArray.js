import {concat, isArray} from 'lodash'

export default function makeArray(arrayOrObject) {
  return isArray(arrayOrObject) ? arrayOrObject : concat(arrayOrObject)
}
