import {updateItemsById} from '../src'

test('updateItemsById', () => {
  const arr = Object.freeze(
    [{id: 1, val: 2}, {id: 2, val: 5}, {id: 3, val: 8}, {id: 4, val: 1}]
  )

  const result = updateItemsById(arr, [{id: 2, val: 6}, {id: 3, val: 9}])
  const expected = [{id: 1, val: 2}, {id: 2, val: 6}, {id: 3, val: 9}, {id: 4, val: 1}]

  expect(result).toEqual(expected)
})
