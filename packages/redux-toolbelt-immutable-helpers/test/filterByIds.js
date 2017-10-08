import {filterByIds} from '../src'

test('filterByIds', () => {
  const arr = [{id: 1, val: 2}, {id: 2, val: 5}, {id: 3, val: 8}, {id: 4, val: 1}]
  const result = filterByIds(arr, [2, 4])
  const expected = [{id: 2, val: 5}, {id: 4, val: 1}]

  expect(arr === result).toBe(false)
  expect(result).toEqual(expected)
})
