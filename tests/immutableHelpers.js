import {pushItems, unshiftItems, addItemsInIndex, removeItem} from '../lib/immutableHelpers'

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
