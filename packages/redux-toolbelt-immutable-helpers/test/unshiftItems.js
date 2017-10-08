import {unshiftItems} from '../src'

test('unshiftItems', () => {
  const arr = [{a: 1}, {b: 2}]
  const result = unshiftItems(arr, [{c: 3}, {d: 4}])
  const expected = [{c: 3}, {d: 4}, {a: 1}, {b: 2}]

  expect(arr === result).toBe(false)
  expect(result).toEqual(expected)
})