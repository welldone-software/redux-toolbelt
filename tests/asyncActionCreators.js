import {makeAsyncActionCreator} from '../src'
import test from 'ava'

test('type assignment with naming conventions', t => {

  const a = makeAsyncActionCreator('A')
  const b = makeAsyncActionCreator('B', x => ({x}))
  const c = makeAsyncActionCreator('C', x => ({payload: x, meta: x}))

  t.is(a.TYPE, 'A@ASYNC_REQUEST')
  t.is(b.TYPE, 'B@ASYNC_REQUEST')
  t.is(c.TYPE, 'C@ASYNC_REQUEST')

  t.is(a.success.TYPE, 'A@ASYNC_SUCCESS')
  t.is(b.success.TYPE, 'B@ASYNC_SUCCESS')
  t.is(c.success.TYPE, 'C@ASYNC_SUCCESS')

  t.is(a.failure.TYPE, 'A@ASYNC_FAILURE')
  t.is(b.failure.TYPE, 'B@ASYNC_FAILURE')
  t.is(c.failure.TYPE, 'C@ASYNC_FAILURE')
})

test('args mapping is working for main (request) action', t => {

  const a = makeAsyncActionCreator('A')
  const b = makeAsyncActionCreator('B', x => ({x}))
  const c = makeAsyncActionCreator('C', x => ({payload: x, meta: x}))

  t.deepEqual(a(), {type: 'A@ASYNC_REQUEST', payload: undefined, meta: undefined})
  t.deepEqual(a(undefined, 'm'), {type: 'A@ASYNC_REQUEST', payload: undefined, meta: 'm'})
  t.deepEqual(a('p'), {type: 'A@ASYNC_REQUEST', payload: 'p', meta: undefined})
  t.deepEqual(a('p', 'm'), {type: 'A@ASYNC_REQUEST', payload: 'p', meta: 'm'})

  t.deepEqual(b(), {type: 'B@ASYNC_REQUEST', payload: {x: undefined}, meta: undefined})
  t.deepEqual(b(4), {type: 'B@ASYNC_REQUEST', payload: {x: 4}, meta: undefined})
  t.deepEqual(b({y: '5'}), {type: 'B@ASYNC_REQUEST', payload: {x: {y: '5'} }, meta: undefined})

  t.deepEqual(c(), {type: 'C@ASYNC_REQUEST', payload: undefined, meta: undefined})
  t.deepEqual(c(4), {type: 'C@ASYNC_REQUEST', payload: 4, meta: 4})
  t.deepEqual(c({y: '5'}), {type: 'C@ASYNC_REQUEST', payload: {y: '5'}, meta: {y: '5'}})

})

test('child (success and failure) actions always use trivial args mapping', t => {

  const actionCreators = [
    makeAsyncActionCreator('A'),
    makeAsyncActionCreator('B', x => ({x})),
    makeAsyncActionCreator('C', x => ({payload: x, meta: x})),
  ]
  const childActions = ['success', 'failure']

  actionCreators.forEach(function(a) {
    childActions.forEach(function(c){
      const type = a.TYPE.replace('REQUEST', c.toUpperCase())
      t.deepEqual(a[c](), {type, payload: undefined, meta: undefined})
      t.deepEqual(a[c](undefined, 'm'), {type, payload: undefined, meta: 'm'})
      t.deepEqual(a[c]('p'), {type, payload: 'p', meta: undefined})
      t.deepEqual(a[c]('p', 'm'), {type, payload: 'p', meta: 'm'})
    })
  })
})
