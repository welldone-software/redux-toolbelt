import {removeItem} from '../src'

test('removeItem', () => {
  const arr = [{a: 1}, {b: 2}, {c: 3}]
  const result = removeItem(arr, 1)
  const expected = [{a: 1}, {c: 3}]

  expect(arr === result).toBe(false)
  expect(result).toEqual(expected)
})
