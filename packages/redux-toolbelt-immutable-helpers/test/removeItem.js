import {removeItem} from '../src'

test('removeItem', () => {
  const arr = Object.freeze(
    [{a: 1}, {b: 2}, {c: 3}]
  )

  const result = removeItem(arr, 1)
  const expected = [{a: 1}, {c: 3}]

  expect(result).toEqual(expected)
})
