import {updateItemById} from '../src'


test('updateItemById', () => {
  const arr = Object.freeze(
    [{id: 1, val: 3}, {id: 2, val: 5}, {id: 3, val: 8}]
  )

  const result = updateItemById(arr, 2, {val: 10, otherVal: 16})
  const expected = [{id: 1, val: 3}, {id: 2, val: 10, otherVal: 16}, {id: 3, val: 8}]

  expect(result).toEqual(expected)
})

test('updateItemById with updating function', () => {
  const arr = Object.freeze(
    [{id: 1, val: 3}, {id: 2, val: 5}, {id: 3, val: 8}]
  )

  const result = updateItemById(arr, 2, item => ({val: item.val+1}))
  const expected = [{id: 1, val: 3}, {id: 2, val: 6}, {id: 3, val: 8}]

  expect(result).toEqual(expected)
})

