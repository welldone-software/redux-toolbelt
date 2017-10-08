import {removeItem} from '../src'

test('removeItem: return original array if index > array.length -1 ', () => {
  const arr = [{a: 1}, {b: 2}, {c: 3}]
  const result = removeItem(arr, 3)
  const expected = arr

  expect(result).toEqual(expected)
})

test('removeItem: remove Item', () => {
  const arr = [{a: 1}, {b: 2}, {c: 3}]
  const result = removeItem(arr, 1)
  const expected = [{a: 1}, {c: 3}]

  expect(result).toEqual(expected)
})
