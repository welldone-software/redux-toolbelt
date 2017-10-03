import updateObjectProperties from '../../packages/redux-toolbelt-immutable-helpers/src/updateObjectProperties'

test('updateObjectProperties v1', () => {
  const obj = {a: 'a', b: 'b', c: 'c'}

  const obj2 = updateObjectProperties(obj, {b: 'test', d: () => 'd'})

  expect(obj).toEqual({a: 'a', b: 'b', c: 'c'})

  expect(obj2).toEqual({a: 'a', b: 'test', c: 'c', d: 'd'})
})

test('updateObjectProperties v2', () => {
  const obj = {a: 'a', b: 'b', c: 'c'}

  const obj2 = updateObjectProperties(obj, ['b', 'c'], 'test')

  expect(obj).toEqual({a: 'a', b: 'b', c: 'c'})

  expect(obj2).toEqual({a: 'a', b: 'test', c: 'test'})
})

test('updateObjectProperties v3', () => {
  const obj = {a: 'a', b: 'b', c: 'c'}

  const obj2 = updateObjectProperties(obj, ['b', 'c'], (value, prop) => {
    if(prop === 'b'){
      return 'test-b'
    }
    if(value === 'c'){
      return 'test-c'
    }
  })

  expect(obj).toEqual({a: 'a', b: 'b', c: 'c'})

  expect(obj2).toEqual({a: 'a', b: 'test-b', c: 'test-c'})
})

test('updateObjectProperties v4', () => {
  const obj = {a: 1, b: 2, c: 3}

  const obj2 = updateObjectProperties(obj, (value, prop) => (prop + value))

  expect(obj).toEqual({a: 1, b: 2, c: 3})

  expect(obj2).toEqual({a: 'a1', b: 'b2', c: 'c3'})
})

