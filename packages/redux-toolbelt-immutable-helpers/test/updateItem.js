import {updateItem} from '../src'

test('updateItem: if no array is supplied, return empty array', () => {
  const result = updateItem()
  const expected = []

  expect(result).toEqual(expected)
})

test('updateItem: if index > arr.length, return original array', () => {
  const arr = [{id: 1, val: 3}, {id: 2, val: 5}, {id: 3, val: 8}]  
  const result = updateItem(arr, 6, {val: 10, otherVal: 16})
  const expected = arr
  
  expect(result).toEqual(expected)
})

test('updateItem: updating item with the same value should return the exact same array', () => {
  const arr = [{id: 1, val: 3}, {id: 2, val: 5}, {id: 3, val: 8}]
  const result = updateItem(arr, 1, {val: 5})
  const expected = arr

  expect(result).toEqual(expected)
})

test('updateItem: update item', () => {
  const arr = [{id: 1, val: 3}, {id: 2, val: 5}, {id: 3, val: 8}]
  const result = updateItem(arr, 1, {val: 10, otherVal: 16})
  const expected = [{id: 1, val: 3}, {id: 2, val: 10, otherVal: 16}, {id: 3, val: 8}]

  expect(result).toEqual(expected)
})
