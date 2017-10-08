import {removeItemsById} from '../src'

test('removeItemsById: if no array is given, should return empty array', () => {
  const result = removeItemsById()
  const expected = []

  expect(result).toEqual(expected)
})

test('removeItemsById: if an empty array is given, should return empty array', () => {
  const arr = []
  const result = removeItemsById(arr)
  const expected = arr

  expect(result).toEqual(expected)
})

test('removeItemsById: if no items to remove, return original array', () => {
  const arr = [{id: 1, val: 'a'}, {id: 2, val: 'b'}, {id: 3, val: 'c'}, {id: 4, val: 'd'}]
  const result = removeItemsById(arr)

  expect(arr === result).toBe(true)
})

test('removeItemsById: remove items by id', () => {
  const arr = [{id: 1, val: 'a'}, {id: 2, val: 'b'}, {id: 3, val: 'c'}, {id: 4, val: 'd'}]
  const result = removeItemsById(arr, [{id: 2, val: 'doesnt matter'}, {id: 4}])
  const expected = [{id: 1, val: 'a'}, {id: 3, val: 'c'}]

  expect(result).toEqual(expected)
})

test('removeItemsById: remove items by val', () => {
  const arr = [{id: 1, val: 'a'}, {id: 2, val: 'b'}, {id: 3, val: 'c'}, {id: 4, val: 'd'}]
  const idSelector = item => item.val
  const result = removeItemsById(arr, [{id: 'who cares', val: 'c'}, {val: 'b'}], idSelector)
  const expected = [{id: 1, val: 'a'}, {id: 4, val: 'd'}]

  expect(arr === result).toBe(false)
  expect(result).toEqual(expected)
})

test('removeItemsById: return original array if no items were removed', () => {
  const arr = [{id: 1, val: 'a'}, {id: 2, val: 'b'}, {id: 3, val: 'c'}, {id: 4, val: 'd'}]
  const result = removeItemsById(arr, [{id: 5, val: 'doesnt matter'}, {id: 6}, {cat: 'meow'}])
  const expected = arr

  expect(result).toEqual(expected)
})
