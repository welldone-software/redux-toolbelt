import {pushItems, unshiftItems, addItemsInIndex, removeItem, removeItemsById, replaceItem, repositionItem, repositionItemById, updateItem} from '../lib/immutableHelpers'

import test from 'ava'

test('pushItems', t => {
  const arr = [{a: 1}, {b: 2}]
  const result = pushItems(arr, [{c: 3}, {d: 4}])
  const expected = [{a: 1}, {b: 2}, {c: 3}, {d: 4}]

  t.false(arr === result)
  t.deepEqual(result, expected)
})

test('unshiftItems', t => {
  const arr = [{a: 1}, {b: 2}]
  const result = unshiftItems(arr, [{c: 3}, {d: 4}])
  const expected = [{c: 3}, {d: 4}, {a: 1}, {b: 2}]

  t.false(arr === result)
  t.deepEqual(result, expected)
})

test('addItemsInIndex', t => {
  const arr = [{a: 1}, {b: 2}]
  const result = addItemsInIndex(arr, 1, [{c: 3}, {d: 4}])
  const expected = [{a: 1}, {c: 3}, {d: 4}, {b: 2}]

  t.false(arr === result)
  t.deepEqual(result, expected)
})

test('removeItem', t => {
  const arr = [{a: 1}, {b: 2}, {c: 3}]
  const result = removeItem(arr, 1)
  const expected = [{a: 1}, {c: 3}]

  t.false(arr === result)
  t.deepEqual(result, expected)
})

test('removeItemsById', t => {
  const arr = [{id: 1, val: 'a'}, {id: 2, val: 'b'}, {id: 3, val: 'c'}, {id: 4, val: 'd'}]
  const result = removeItemsById(arr, [{id: 2, val: 'doesnt matter'}, {id: 4}])
  const expected = [{id: 1, val: 'a'}, {id: 3, val: 'c'}]

  t.false(arr === result)
  t.deepEqual(result, expected)
})

test('replaceItem', t => {
  const arr = [{a: 1}, {b: 2}, {c: 3}]
  const result = replaceItem(arr, 1, {d: 4})
  const expected = [{a: 1}, {d: 4}, {c: 3}]

  t.false(arr === result)
  t.deepEqual(result, expected)
})

test('repositionItem', t => {
  const arr = [{a: 1}, {b: 2}, {c: 3}, {d: 4}, {e: 5}]
  const result = repositionItem(arr, 1, 3)
  const expected = [{a: 1}, {c: 3}, {d: 4}, {b: 2}, {e: 5}]

  t.false(arr === result)
  t.deepEqual(result, expected)
})

test('repositionItem (to start)', t => {
  const arr = [{a: 1}, {b: 2}, {c: 3}, {d: 4}, {e: 5}]
  const result = repositionItem(arr, 1, 'start')
  const expected = [{b: 2}, {a: 1}, {c: 3}, {d: 4}, {e: 5}]

  t.false(arr === result)
  t.deepEqual(result, expected)
})

test('repositionItem (to end)', t => {
  const arr = [{a: 1}, {b: 2}, {c: 3}, {d: 4}, {e: 5}]
  const result = repositionItem(arr, 1, 'end')
  const expected = [{a: 1}, {c: 3}, {d: 4}, {e: 5}, {b: 2}]

  t.false(arr === result)
  t.deepEqual(result, expected)
})

test('repositionItemById', t => {
  const arr = [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}]
  const result = repositionItemById(arr, 2, 3)
  const expected = [{id: 1}, {id: 3}, {id: 4}, {id: 2}, {id: 5}]

  t.false(arr === result)
  t.deepEqual(result, expected)
})

test('updateItem', t => {
  const arr = [{id: 1, val: 3}, {id: 2, val: 5}, {id: 3, val: 8}]
  const result = updateItem(arr, 1, {val: 10, otherVal: 16})
  const expected = [{id: 1, val: 3}, {id: 2, val: 10, otherVal: 16}, {id: 3, val: 8}]

  t.false(arr === result)
  t.deepEqual(result, expected)
})
