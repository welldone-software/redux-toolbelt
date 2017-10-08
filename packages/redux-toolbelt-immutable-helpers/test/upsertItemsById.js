import {upsertItemsById} from '../src'

test('upsertItemsById: if no array and no updatedItems are supplied, return empty array', () => {
  const result = upsertItemsById()
  const expected = []

  expect(result).toEqual(expected)
})

test('upsertItemsById: if no array is supplied, return updateItems', () => {
  const result = upsertItemsById(null, [{id: 1, val: 2}, {id: 2, val: 5}])
  const expected = [{id: 1, val: 2}, {id: 2, val: 5}]

  expect(result).toEqual(expected)
})

test('upsertItemsById: if updated items are empty, return original array', () => {
  const arr = [{id: 1, val: 2}, {id: 2, val: 5}, {id: 3, val: 8}, {id: 4, val: 1}]  
  const result = upsertItemsById(arr)
  const expected = arr
  
  expect(result).toEqual(expected)
})

test('upsertItemsById: scenario where updatedItems is false, should return empty array', () => {
  const result = upsertItemsById(null, false)
  const expected = []

  expect(result).toEqual(expected)
})

test('upsertItemsById: if updated items are the same as original array, return the same items', () => {
  const arr = [{id: 1, val: 2}, {id: 2, val: 5}, {id: 3, val: 8}, {id: 4, val: 1}]
  const result = upsertItemsById(arr, [{id: 2, val: 5}, {id: 4, val: 1}])
  const expected = arr

  expect(result).toEqual(expected)
})


test('upsertItemsById: upsert items by id', () => {
  const arr = [{id: 1, val: 2}, {id: 2, val: 5}, {id: 3, val: 8}, {id: 4, val: 1}]
  const result = upsertItemsById(arr, [{id: 2, val: 6}, {id: 3, val: 9}, {id: 5, val: 16}])
  const expected = [{id: 1, val: 2}, {id: 2, val: 6}, {id: 3, val: 9}, {id: 4, val: 1}, {id: 5, val: 16}]

  expect(result).toEqual(expected)
})

test('upsertItemsById: upsert items by val function', () => {
  const arr = [{id: 1, val: 2}, {id: 2, val: 5}, {id: 3, val: 8}, {id: 4, val: 1}]
  const idSelector = item => item.val
  const result = upsertItemsById(arr, [{id: 5, val: 5}, {id: 12, val: 8}, {id: 5, val: 3}], idSelector)
  const expected = [{id: 1, val: 2}, {id: 5, val: 5}, {id: 12, val: 8}, {id: 4, val: 1}, {id: 5, val: 3}]

  expect(arr === result).toBe(false)
  expect(result).toEqual(expected)
})
