import {pushItems} from '../src'

test('pushItems: take original array, make a copy, push new items to copy', () => {
  const arr = Object.freeze(
    [{a: 1}, {b: 2}]
  )

  const result = pushItems(arr, [{c: 3}, {d: 4}])
  const expected = [{a: 1}, {b: 2}, {c: 3}, {d: 4}]

  expect(result).toEqual(expected)
})

test('pushItems: scenario where newItems isnt an array', () => {
  const arr = [{a: 1}, {b: 2}]

  const result = pushItems(arr, {c: 3})
  const expected = [{a: 1}, {b: 2}, {c: 3}]

  expect(result).toEqual(expected)
})

test('pushItems: scenario where newItems is an empty array and original array exists', () => {
  const arr = [{a: 1}, {b: 2}]

  const result = pushItems(arr, [])
  const expected = [{a: 1}, {b: 2}]

  expect(result).toEqual(expected)
})

test('pushItems: scenario where newItems and original array are undefined', () => {

  const result = pushItems(undefined, undefined)
  const expected = []

  expect(result).toEqual(expected)
})

test('pushItems: no array provided, expecting return of newItems', () => {

  const result = pushItems(null, [{a: 1}, {b: 2}])
  const expected = [{a: 1}, {b: 2}]

  expect(result).toEqual(expected)
})
