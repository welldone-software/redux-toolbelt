import {unshiftItems} from '../src'

test('unshiftItems', () => {
  const arr = Object.freeze(
    [{a: 1}, {b: 2}]
  )

  const result = unshiftItems(arr, [{c: 3}, {d: 4}])
  const expected = [{c: 3}, {d: 4}, {a: 1}, {b: 2}]

  expect(result).toEqual(expected)
})
