import {makeArray} from '../src'

test('makeArray creates array from object', () => {
  const obj = Object.freeze(
    {id: 1, val: 5, otherVal: 8, anotherVal: 16}
  )

  const result = makeArray(obj)

  expect(result).toEqual([obj])
})

test('makeArray returns the same array when provided an array', () => {
  const arr = Object.freeze(
    [{id: 1, val: 5}, {id: 2, val: 6}]
  )

  const result = makeArray(arr)

  expect(result).toBe(arr)
})
