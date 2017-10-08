import {repositionItemById} from '../src'

test('repositionItemById: if id was not found, return original array', () => {
  const arr = [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}]
  const result = repositionItemById(arr, 6, 3)
  const expected = arr

  expect(result).toEqual(expected)
})

test('repositionItemById: reposition item by id', () => {
  const arr = [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}]
  const result = repositionItemById(arr, 2, 3)
  const expected = [{id: 1}, {id: 3}, {id: 4}, {id: 2}, {id: 5}]

  expect(result).toEqual(expected)
})

test('repositionItemById: reposition item by val', () => {
  const arr = [{id: 1, val: 'a'}, {id: 2, val: 'b'}, {id: 3, val: 'c'}]
  const idSelector = item => item.val
  const result = repositionItemById(arr, 'b', 0, idSelector)
  const expected = [{id: 2, val: 'b'}, {id: 1, val: 'a'}, {id: 3, val: 'c'}]

  expect(arr === result).toBe(false)
  expect(result).toEqual(expected)
})
