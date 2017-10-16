import {makeActionCreator, isActionCreator} from '../src'


test('type is assigned', () => {
  const a = makeActionCreator('A')

  expect(a.TYPE).toBe('A')
})

test('no mapping', () => {
  const a = makeActionCreator('A')

  expect(isActionCreator(a)).toBe(true)
  expect(a()).toEqual({type: 'A', payload: undefined, meta: undefined})
  expect(a(undefined, 'm')).toEqual({type: 'A', payload: undefined, meta: 'm'})
  expect(a('p')).toEqual({type: 'A', payload: 'p', meta: undefined})
  expect(a('p', 'm')).toEqual({type: 'A', payload: 'p', meta: 'm'})
})

test('short mapping', () => {
  const a = makeActionCreator('A', x => ({x}))

  expect(isActionCreator(a)).toBe(true)
  expect(a()).toEqual({type: 'A', payload: {x: undefined}, meta: undefined})
  expect(a(4)).toEqual({type: 'A', payload: {x: 4}, meta: undefined})
  expect(a({y: '5'})).toEqual({type: 'A', payload: {x: {y: '5'} }, meta: undefined})

})

test('full mapping, payload and meta', () => {
  const a = makeActionCreator('A', x => ({payload: x, meta: x}))
  const b = makeActionCreator('B', x => ({payload: x, meta: undefined}))
  const c = makeActionCreator('C', x => ({payload: undefined, meta: x}))

  expect(isActionCreator(a)).toBe(true)
  expect(a()).toEqual({type: 'A', payload: undefined, meta: undefined})
  expect(a(4)).toEqual({type: 'A', payload: 4, meta: 4})
  expect(a({y: '5'})).toEqual({type: 'A', payload: {y: '5'}, meta: {y: '5'}})

  expect(isActionCreator(b)).toBe(true)
  expect(b()).toEqual({type: 'B', payload: undefined, meta: undefined})
  expect(b(4)).toEqual({type: 'B', payload: 4, meta: undefined})
  expect(b({y: '5'})).toEqual({type: 'B', payload: {y: '5'}, meta: undefined})

  expect(isActionCreator(c)).toBe(true)
  expect(c()).toEqual({type: 'C', payload: undefined, meta: undefined})
  expect(c(4)).toEqual({type: 'C', payload: undefined, meta: 4})
  expect(c({y: '5'})).toEqual({type: 'C', payload: undefined, meta: {y: '5'}})

})

test('full mapping, missing meta/payload fails', () => {
  const a = makeActionCreator('A', x => ({payload: x}))
  const b = makeActionCreator('B', x => ({meta: x}))

  expect(isActionCreator(a)).toBe(true)
  expect(() => a()).toThrow()
  expect(() => a(4)).toThrow()
  expect(() => a({y: '5'})).toThrow()

  expect(isActionCreator(b)).toBe(true)
  expect(() => b()).toThrow()
  expect(() => b(4)).toThrow()
  expect(() => b({y: '5'})).toThrow()
})

test('withDefaults prefix', () => {
  const myMakeActionCreator = makeActionCreator.withDefaults({prefix: 'x@'})

  const a = myMakeActionCreator('A')
  const b = myMakeActionCreator('B', z => ({z}))
  const c = myMakeActionCreator('C', z => ({payload: z, meta: z}))

  expect(isActionCreator(a)).toBe(true)
  expect(a()).toEqual({type: 'x@A', payload: undefined, meta: undefined})

  expect(isActionCreator(b)).toBe(true)
  expect(b()).toEqual({type: 'x@B', payload: {z: undefined}, meta: undefined})

  expect(isActionCreator(c)).toBe(true)
  expect(c()).toEqual({type: 'x@C', payload: undefined, meta: undefined})
})

test('withDefaults defaultMeta', () => {
  const myMakeActionCreator = makeActionCreator.withDefaults({defaultMeta: {opt: 1}})

  const a = myMakeActionCreator('A')
  const b = myMakeActionCreator('B', z => ({z}))
  const c = myMakeActionCreator('C', z => ({payload: z, meta: z}))

  expect(isActionCreator(a)).toBe(true)
  expect(a()).toEqual({type: 'A', payload: undefined, meta: {opt: 1}})

  expect(isActionCreator(b)).toBe(true)
  expect(b()).toEqual({type: 'B', payload: {z: undefined}, meta: {opt: 1}})

  expect(isActionCreator(c)).toBe(true)
  expect(c()).toEqual({type: 'C', payload: undefined, meta: {opt: 1}})
  expect(c({x: 2})).toEqual({type: 'C', payload: {x: 2}, meta: {opt: 1, x: 2}})
})
