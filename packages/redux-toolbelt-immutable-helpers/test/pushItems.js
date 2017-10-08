import {pushItems} from '../src'

test('pushItems', () => {
  const arr = [{a: 1}, {b: 2}]
  const result = pushItems(arr, [{c: 3}, {d: 4}])
  const expected = [{a: 1}, {b: 2}, {c: 3}, {d: 4}]

  expect(arr === result).toBe(false)
  expect(result).toEqual(expected)
})
