import {upsertItemsById} from '../src'

test('upsertItemsById', () => {
  const arr = [{id: 1, val: 2}, {id: 2, val: 5}, {id: 3, val: 8}, {id: 4, val: 1}]
  const result = upsertItemsById(arr, [{id: 2, val: 6}, {id: 3, val: 9}, {id: 5, val: 16}])
  const expected = [{id: 1, val: 2}, {id: 2, val: 6}, {id: 3, val: 9}, {id: 4, val: 1}, {id: 5, val: 16}]

  expect(arr === result).toBe(false)
  expect(result).toEqual(expected)
})
