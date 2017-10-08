import {removeItemsById} from '../src'

test('removeItemsById', () => {
  const arr = [{id: 1, val: 'a'}, {id: 2, val: 'b'}, {id: 3, val: 'c'}, {id: 4, val: 'd'}]
  const result = removeItemsById(arr, [{id: 2, val: 'doesnt matter'}, {id: 4}])
  const expected = [{id: 1, val: 'a'}, {id: 3, val: 'c'}]

  expect(arr === result).toBe(false)
  expect(result).toEqual(expected)
})
