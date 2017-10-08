import {updateObjectProperty} from '../src'

test('updateObjectProperty', () => {
  const obj = {id: 1, val: 5, otherVal: 8, anotherVal: 16}
  const result = updateObjectProperty(obj, 'otherVal', 70)
  const expected = {id: 1, val: 5, otherVal: 70, anotherVal: 16}

  expect(obj === result).toBe(false)
  expect(result).toEqual(expected)
})
