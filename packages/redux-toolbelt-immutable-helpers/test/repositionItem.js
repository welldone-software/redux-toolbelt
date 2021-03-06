import {repositionItem} from '../src'

test('repositionItem', () => {
  const arr = Object.freeze(
    [{a: 1}, {b: 2}, {c: 3}, {d: 4}, {e: 5}]
  )

  const result = repositionItem(arr, 1, 3)
  const expected = [{a: 1}, {c: 3}, {d: 4}, {b: 2}, {e: 5}]

  expect(result).toEqual(expected)
})

test('repositionItem (to start)', () => {
  const arr = Object.freeze(
    [{a: 1}, {b: 2}, {c: 3}, {d: 4}, {e: 5}]
  )

  const result = repositionItem(arr, 1, 'start')
  const expected = [{b: 2}, {a: 1}, {c: 3}, {d: 4}, {e: 5}]

  expect(result).toEqual(expected)
})

test('repositionItem (to end)', () => {
  const arr = Object.freeze(
    [{a: 1}, {b: 2}, {c: 3}, {d: 4}, {e: 5}]
  )

  const result = repositionItem(arr, 1, 'end')
  const expected = [{a: 1}, {c: 3}, {d: 4}, {e: 5}, {b: 2}]

  expect(result).toEqual(expected)
})
