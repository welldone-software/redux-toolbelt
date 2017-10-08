import {addItemsInIndex} from '../src'

test('addItemsInIndex', () => {
  const arr = [{a: 1}, {b: 2}]
  const result = addItemsInIndex(arr, 1, [{c: 3}, {d: 4}])
  const expected = [{a: 1}, {c: 3}, {d: 4}, {b: 2}]

  expect(arr === result).toBe(false)
  expect(result).toEqual(expected)
})
