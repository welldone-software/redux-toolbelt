import {pushItems, unshiftItems, addItemsInIndex, removeItem, removeItemsById, replaceItem, repositionItem, repositionItemById, updateItem, updateItemById, updateItemsByFilter, updateItemsById, upsertItemsById, filterByIds, updateObjectProperty, updateObjectProperties, makeArray} from '../lib/immutableHelpers'

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

test('updateItemById', t => {
  const arr = [{id: 1, val: 3}, {id: 2, val: 5}, {id: 3, val: 8}]
  const result = updateItemById(arr, 2, {val: 10, otherVal: 16})
  const expected = [{id: 1, val: 3}, {id: 2, val: 10, otherVal: 16}, {id: 3, val: 8}]

  t.false(arr === result)
  t.deepEqual(result, expected)
})

test('updateItemById with updating function', t => {
  const arr = [{id: 1, val: 3}, {id: 2, val: 5}, {id: 3, val: 8}]
  const result = updateItemById(arr, 2, item => ({val: item.val+1}))
  const expected = [{id: 1, val: 3}, {id: 2, val: 6}, {id: 3, val: 8}]

  t.false(arr === result)
  t.deepEqual(result, expected)
})

test('updateItemsByFilter', t => {
  const arr = [{id: 1, val: 2}, {id: 2, val: 5}, {id: 3, val: 8}, {id: 4, val: 1}]
  const result = updateItemsByFilter(arr, item => item.val > 2, item => ({val: item.val+1}))
  const expected = [{id: 1, val: 2}, {id: 2, val: 6}, {id: 3, val: 9}, {id: 4, val: 1}]

  t.false(arr === result)
  t.deepEqual(result, expected)
})

test('updateItemsById', t => {
  const arr = [{id: 1, val: 2}, {id: 2, val: 5}, {id: 3, val: 8}, {id: 4, val: 1}]
  const result = updateItemsById(arr, [{id: 2, val: 6}, {id: 3, val: 9}])
  const expected = [{id: 1, val: 2}, {id: 2, val: 6}, {id: 3, val: 9}, {id: 4, val: 1}]

  t.false(arr === result)
  t.deepEqual(result, expected)
})

test('upsertItemsById', t => {
  const arr = [{id: 1, val: 2}, {id: 2, val: 5}, {id: 3, val: 8}, {id: 4, val: 1}]
  const result = upsertItemsById(arr, [{id: 2, val: 6}, {id: 3, val: 9}, {id: 5, val: 16}])
  const expected = [{id: 1, val: 2}, {id: 2, val: 6}, {id: 3, val: 9}, {id: 4, val: 1}, {id: 5, val: 16}]

  t.false(arr === result)
  t.deepEqual(result, expected)
})

test('filterByIds', t => {
  const arr = [{id: 1, val: 2}, {id: 2, val: 5}, {id: 3, val: 8}, {id: 4, val: 1}]
  const result = filterByIds(arr, [2, 4])
  const expected = [{id: 2, val: 5}, {id: 4, val: 1}]

  t.false(arr === result)
  t.deepEqual(result, expected)
})

test('updateObjectProperty', t => {
  const obj = {id: 1, val: 5, otherVal: 8, anotherVal: 16}
  const result = updateObjectProperty(obj, 'otherVal', 70)
  const expected = {id: 1, val: 5, otherVal: 70, anotherVal: 16}

  t.false(obj === result)
  t.deepEqual(result, expected)
})

test('updateObjectProperties', t => {
  const obj = {id: 1, val: 5, otherVal: 8, anotherVal: 16}
  const result = updateObjectProperties(obj, {val: 10, otherVal: 70})
  const expected = {id: 1, val: 10, otherVal: 70, anotherVal: 16}

  t.false(obj === result)
  t.deepEqual(result, expected)
})

test('makeArray creates array from object', t => {
  const obj = {id: 1, val: 5, otherVal: 8, anotherVal: 16}
  const result = makeArray(obj)

  t.true(result.length === 1)
  t.true(result[0] === obj)
})

test('makeArray copies the provided array to a new one', t => {
  const arr = [{id: 1, val: 5}, {id: 2, val: 6}]
  const result = makeArray(arr)

  t.false(arr === result)
  t.deepEqual(result, arr)
})
