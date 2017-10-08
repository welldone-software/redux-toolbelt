import {filterByIds} from '../src'

test('filterByIds: should return empty array if not given arr', () => {
  const result = filterByIds()
  const expected = []

  expect(result).toEqual(expected)
})

test('filterByIds: should return empty array if array is empty', () => {
  const result = filterByIds([])
  const expected = []

  expect(result).toEqual(expected)
})

test('filterByIds: should return empty array if itemIds is empty', () => {
  const arr = [{id: 1, val: 2}, {id: 2, val: 5}, {id: 3, val: 8}, {id: 4, val: 1}]
  const result = filterByIds(arr,[])
  const expected = []

  expect(arr === result).toBe(false)
  expect(result).toEqual(expected)
})

test('filterByIds: filter by id', () => {
  const arr = [{id: 1, val: 2}, {id: 2, val: 5}, {id: 3, val: 8}, {id: 4, val: 1}]
  const result = filterByIds(arr, [2, 4])
  const expected = [{id: 2, val: 5}, {id: 4, val: 1}]

  expect(result).toEqual(expected)
})

test('filterByIds: filtering by val', () => {
  const arr = [{id: 1, val: 2}, {id: 2, val: 5}, {id: 3, val: 8}, {id: 4, val: 1}]
  const idSelector = item => item.val
  const result = filterByIds(arr, [1,2],idSelector)
  const expected = [{id: 1, val: 2}, {id: 4, val: 1}]

  expect(arr === result).toBe(false)
  expect(result).toEqual(expected)
})

test('filterByIds: if filter matchs old array exactly, return the old array', () => {
  const arr = [{id: 1, val: 2}, {id: 2, val: 5}]
  const result = filterByIds(arr, [1,2])
  const expected = arr

  expect(result).toEqual(expected)
})
