import {makeReducer, makeActionCreator} from '../../packages/redux-toolbelt/src'

import test from 'ava'

test('trivial', t => {

  const a = makeActionCreator('A')

  const reducer = makeReducer(a)

  const state = reducer({}, a('test'))

  t.deepEqual(state, 'test')
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
