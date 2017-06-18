import {pushItems} from '../lib/immutableHelpers'

import test from 'ava'

test('push items', t => {
  const arr = [{a: 1}, {b: 2}]
  const result = pushItems(arr, [{c: 3}, {d: 4}])
  const expected = [{a: 1}, {b: 2}, {c: 3}, {d: 4}]

  t.false(arr === result)
  t.deepEqual(result, expected)
})
