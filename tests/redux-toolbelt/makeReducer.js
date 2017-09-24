import {makeReducer, makeActionCreator} from '../../packages/redux-toolbelt/src'

import test from 'ava'

test('trivial', t => {

  const a = makeActionCreator('A')

  const reducer = makeReducer(a)

  const state = reducer({}, a('test'))

  t.deepEqual(state, 'test')
})


test('multiple creators', t => {

  const a = makeActionCreator('A')
  const b = makeActionCreator('B')
  const c = makeActionCreator('C')

  const reducer = makeReducer([a, b, c])

  let state = reducer({}, a('a test'))
  t.deepEqual(state, 'a test')
  state = reducer({}, b('b test'))
  t.deepEqual(state, 'b test')
  state = reducer({}, c('c test'))
  t.deepEqual(state, 'c test')
})

test('default state', t => {

  const a = makeActionCreator('A')

  const reducer = makeReducer(a, {defaultState: false})

  const state = reducer(undefined, {TYPE: 'something'})

  t.deepEqual(state, false)
})


test('function', t => {

  const a = makeActionCreator('A')

  const reducer = makeReducer(a, (state, {payload}) => `${state}->${payload}`)

  const state = reducer('initial', a('test'))

  t.deepEqual(state, 'initial->test')
})

test('function and default state', t => {
  const a = makeActionCreator('A')

  const reducer = makeReducer(a, state => !state)

  const state1 = reducer(undefined, {TYPE: '@@redux/INIT'})
  const state2 = reducer(state1, a())

  t.deepEqual(state2, true)
})
