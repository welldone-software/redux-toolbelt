import {repositionItemById} from '../src'


test('repositionItemById', () => {
  const arr = Object.freeze(
    [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}]
  )

  const result = repositionItemById(arr, 2, 3)
  const expected = [{id: 1}, {id: 3}, {id: 4}, {id: 2}, {id: 5}]

  expect(result).toEqual(expected)
})
