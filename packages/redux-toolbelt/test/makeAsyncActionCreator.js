import {makeAsyncActionCreator, isActionCreator} from '../src'

test('type assignment with naming conventions', () => {

  const a = makeAsyncActionCreator('A')
  const b = makeAsyncActionCreator('B', x => ({x}))
  const c = makeAsyncActionCreator('C', x => ({payload: x, meta: x}))

  expect(isActionCreator(a)).toBe(true)
  expect(isActionCreator(b)).toBe(true)
  expect(isActionCreator(c)).toBe(true)
  expect(a.TYPE).toBe('A@ASYNC_REQUEST')
  expect(b.TYPE).toBe('B@ASYNC_REQUEST')
  expect(c.TYPE).toBe('C@ASYNC_REQUEST')

  expect(isActionCreator(a.success)).toBe(true)
  expect(isActionCreator(b.success)).toBe(true)
  expect(isActionCreator(c.success)).toBe(true)
  expect(a.success.TYPE).toBe('A@ASYNC_SUCCESS')
  expect(b.success.TYPE).toBe('B@ASYNC_SUCCESS')
  expect(c.success.TYPE).toBe('C@ASYNC_SUCCESS')

  expect(isActionCreator(a.failure)).toBe(true)
  expect(isActionCreator(b.failure)).toBe(true)
  expect(isActionCreator(c.failure)).toBe(true)
  expect(a.failure.TYPE).toBe('A@ASYNC_FAILURE')
  expect(b.failure.TYPE).toBe('B@ASYNC_FAILURE')
  expect(c.failure.TYPE).toBe('C@ASYNC_FAILURE')
})

test('args mapping is working for main (request) action', () => {

  const a = makeAsyncActionCreator('A')
  const b = makeAsyncActionCreator('B', x => ({x}))
  const c = makeAsyncActionCreator('C', x => ({payload: x, meta: x}))

  expect(isActionCreator(a)).toBe(true)
  expect(isActionCreator(b)).toBe(true)
  expect(isActionCreator(c)).toBe(true)

  expect(a()).toEqual({type: 'A@ASYNC_REQUEST', payload: undefined, meta: undefined})
  expect(a(undefined, 'm')).toEqual({type: 'A@ASYNC_REQUEST', payload: undefined, meta: 'm'})
  expect(a('p')).toEqual({type: 'A@ASYNC_REQUEST', payload: 'p', meta: undefined})
  expect(a('p', 'm')).toEqual({type: 'A@ASYNC_REQUEST', payload: 'p', meta: 'm'})

  expect(b()).toEqual({type: 'B@ASYNC_REQUEST', payload: {x: undefined}, meta: undefined})
  expect(b(4)).toEqual({type: 'B@ASYNC_REQUEST', payload: {x: 4}, meta: undefined})
  expect(b({y: '5'})).toEqual({type: 'B@ASYNC_REQUEST', payload: {x: {y: '5'} }, meta: undefined})

  expect(c()).toEqual({type: 'C@ASYNC_REQUEST', payload: undefined, meta: undefined})
  expect(c(4)).toEqual({type: 'C@ASYNC_REQUEST', payload: 4, meta: 4})
  expect(c({y: '5'})).toEqual({type: 'C@ASYNC_REQUEST', payload: {y: '5'}, meta: {y: '5'}})

})

test('child (success and failure) actions always use trivial args mapping', () => {

  const actionCreators = [
    makeAsyncActionCreator('A'),
    makeAsyncActionCreator('B', x => ({x})),
    makeAsyncActionCreator('C', x => ({payload: x, meta: x})),
  ]
  const childActions = ['success', 'failure']

  actionCreators.forEach(function(a) {
    expect(isActionCreator(a)).toBe(true)
    childActions.forEach(function(c){
      const type = a.TYPE.replace('REQUEST', c.toUpperCase())
      expect(a[c]()).toEqual({type, payload: undefined, meta: undefined})
      expect(a[c](undefined, 'm')).toEqual({type, payload: undefined, meta: 'm'})
      expect(a[c]('p')).toEqual({type, payload: 'p', meta: undefined})
      expect(a[c]('p', 'm')).toEqual({type, payload: 'p', meta: 'm'})
    })
  })
})
