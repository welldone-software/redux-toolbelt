import {repositionItem} from '../src'

test('repositionItem: if no array is passed, return empty array', () => {
  const result = repositionItem()
  const expected = []

  expect(result).toEqual(expected)
})

test('repositionItem: if empty array is passed, return empty array', () => {
  const result = repositionItem([])
  const expected = []

  expect(result).toEqual(expected)
})

test('repositionItem: if oldIndex === newIndex, return original array', () => {
  const arr = [{a: 1}, {b: 2}, {c: 3}, {d: 4}, {e: 5}]
  const result = repositionItem(arr,0,'start')
  const expected = arr

  expect(result).toEqual(expected)
})

test('repositionItem: reposition item', () => {
  const arr = [{a: 1}, {b: 2}, {c: 3}, {d: 4}, {e: 5}]
  const result = repositionItem(arr, 1, 3)
  const expected = [{a: 1}, {c: 3}, {d: 4}, {b: 2}, {e: 5}]

  expect(result).toEqual(expected)
})

test('repositionItem: repositionItem (to start)', () => {
  const arr = [{a: 1}, {b: 2}, {c: 3}, {d: 4}, {e: 5}]
  const result = repositionItem(arr, 1, 'start')
  const expected = [{b: 2}, {a: 1}, {c: 3}, {d: 4}, {e: 5}]

  expect(result).toEqual(expected)
})

test('repositionItem: repositionItem (to end)', () => {
  const arr = [{a: 1}, {b: 2}, {c: 3}, {d: 4}, {e: 5}]
  const result = repositionItem(arr, 1, 'end')
  const expected = [{a: 1}, {c: 3}, {d: 4}, {e: 5}, {b: 2}]

  expect(result).toEqual(expected)
})
