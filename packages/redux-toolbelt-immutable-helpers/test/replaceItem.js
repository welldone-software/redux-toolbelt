import {replaceItem} from '../src'

test('replaceItem', () => {
  const arr = Object.freeze(
    [{a: 1}, {b: 2}, {c: 3}]
  )

  const result = replaceItem(arr, 1, {d: 4})
  const expected = [{a: 1}, {d: 4}, {c: 3}]

  expect(result).toEqual(expected)
})
