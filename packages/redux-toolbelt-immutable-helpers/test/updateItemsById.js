import {updateItemsById} from '../src'

test('updateItemsById: if no array is supplied, return empty array', () => {
  const result = updateItemsById()
  const expected = []

  expect(result).toEqual(expected)
})

test('updateItemsById: if array supplied is empty, return empty array', () => {
  const result = updateItemsById([])
  const expected = []
  
  expect(result).toEqual(expected)
})

test('updateItemsById: updating item with the same value should return the exact same array', () => {
  const arr = [{id: 1, val: 3}, {id: 2, val: 5}, {id: 3, val: 8}]
  const result = updateItemsById(arr, [{id:2 ,val: 5}])
  const expected = arr

  expect(result).toEqual(expected)
})

test('updateItemsById: update items by id', () => {
  const arr = [{id: 1, val: 2}, {id: 2, val: 5}, {id: 3, val: 8}, {id: 4, val: 1}]
  const result = updateItemsById(arr, [{id: 2, val: 6}, {id: 3, val: 9}])
  const expected = [{id: 1, val: 2}, {id: 2, val: 6}, {id: 3, val: 9}, {id: 4, val: 1}]

  expect(result).toEqual(expected)
})

test('updateItemsById: update items by val function', () => {
  const arr = [{id: 1, val: 2}, {id: 2, val: 5}, {id: 3, val: 8}, {id: 4, val: 1}]
  const idSelector = item => item.val
  const result = updateItemsById(arr, [{id: 8, val: 5}, {id: 2, val: 1}], idSelector)
  const expected = [{id: 1, val: 2},{id: 8, val: 5}, {id: 3, val: 8}, {id: 2, val: 1}]

  expect(arr === result).toBe(false)
  expect(result).toEqual(expected)
})
