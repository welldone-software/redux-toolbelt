import {updateObjectProperty} from '../src'

test('updateObjectProperty: return original array if property is updated to old value', () => {
  const obj = {id: 1, val: 5, otherVal: 8, anotherVal: 16}
  const result = updateObjectProperty(obj, 'otherVal', 8)
  const expected = obj

  expect(result).toEqual(expected)
})

test('updateObjectProperty: update object property ', () => {
  const obj = {id: 1, val: 5, otherVal: 8, anotherVal: 16}
  const result = updateObjectProperty(obj, 'otherVal', 70)
  const expected = {id: 1, val: 5, otherVal: 70, anotherVal: 16}

  expect(obj === result).toBe(false)
  expect(result).toEqual(expected)
})
