import {updateItemById} from '../src'

test('updateItemById: if no array is supplied, return empty array', () => {
  const result = updateItemById()
  const expected = []

  expect(result).toEqual(expected)
})

test('updateItemById: if index > arr.length, return original array', () => {
  const arr = [{id: 1, val: 3}, {id: 2, val: 5}, {id: 3, val: 8}]  
  const result = updateItemById(arr, 6, {val: 10, otherVal: 16})
  const expected = arr
  
  expect(result).toEqual(expected)
})

test('updateItemById: update item by id', () => {
  const arr = [{id: 1, val: 3}, {id: 2, val: 5}, {id: 3, val: 8}]
  const result = updateItemById(arr, 2, {val: 10, otherVal: 16})
  const expected = [{id: 1, val: 3}, {id: 2, val: 10, otherVal: 16}, {id: 3, val: 8}]

  expect(result).toEqual(expected)
})

test('updateItemById: update with updating function', () => {
  const arr = [{id: 1, val: 3}, {id: 2, val: 5}, {id: 3, val: 8}]
  const updFunc = item => ({val: item.val+1})
  const result = updateItemById(arr, 2, updFunc)
  const expected = [{id: 1, val: 3}, {id: 2, val: 6}, {id: 3, val: 8}]

  expect(result).toEqual(expected)
})

