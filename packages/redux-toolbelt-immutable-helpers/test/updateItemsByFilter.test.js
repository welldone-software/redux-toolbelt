import {updateItemsByFilter} from '../src'


test('updateItemsByFilter', () => {
  const arr = [{id: 1, val: 2}, {id: 2, val: 5}, {id: 3, val: 8}, {id: 4, val: 1}]
  const result = updateItemsByFilter(arr, item => item.val > 2, item => ({val: item.val+1}))
  const expected = [{id: 1, val: 2}, {id: 2, val: 6}, {id: 3, val: 9}, {id: 4, val: 1}]

  expect(arr === result).toBe(false)
  expect(result).toEqual(expected)
})
