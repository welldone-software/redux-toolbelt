import {addItemsInIndex} from '../src'

test('addItemsInIndex', () => {
  const arr = Object.freeze(
    [{a: 1}, {b: 2}]
  )

  const result = addItemsInIndex(arr, 1, [{c: 3}, {d: 4}])
  const expected = [{a: 1}, {c: 3}, {d: 4}, {b: 2}]

  expect(result).toEqual(expected)
})
