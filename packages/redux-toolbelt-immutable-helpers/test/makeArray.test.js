import {makeArray} from '../src'

test('makeArray creates array from object', () => {
  const obj = {id: 1, val: 5, otherVal: 8, anotherVal: 16}
  const result = makeArray(obj)

  expect(result.length === 1).toBe(true)
  expect(result[0] === obj).toBe(true)
})

test('makeArray copies the provided array to a new one', () => {
  const arr = [{id: 1, val: 5}, {id: 2, val: 6}]
  const result = makeArray(arr)

  expect(arr === result).toBe(false)
  expect(result).toEqual(arr)
})
