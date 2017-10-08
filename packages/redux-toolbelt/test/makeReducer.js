import {makeReducer, makeActionCreator} from '../src'

test('trivial', () => {

  const a = makeActionCreator('A')

  const reducer = makeReducer(a)

  const state = reducer({}, a('test'))

  expect(state).toEqual('test')
})


test('multiple creators', () => {

  const a = makeActionCreator('A')
  const b = makeActionCreator('B')
  const c = makeActionCreator('C')

  const reducer = makeReducer([a, b, c])

  let state = reducer({}, a('a test'))
  expect(state).toEqual('a test')
  state = reducer({}, b('b test'))
  expect(state).toEqual('b test')
  state = reducer({}, c('c test'))
  expect(state).toEqual('c test')
})

test('default state', () => {

  const a = makeActionCreator('A')

  const reducer = makeReducer(a, {defaultState: false})

  const state = reducer(undefined, {TYPE: 'something'})

  expect(state).toEqual(false)
})


test('function', () => {

  const a = makeActionCreator('A')

  const reducer = makeReducer(a, (state, {payload}) => `${state}->${payload}`)

  const state = reducer('initial', a('test'))

  expect(state).toEqual('initial->test')
})

test('function and default state', () => {
  const a = makeActionCreator('A')

  const reducer = makeReducer(a, state => !state)

  const state1 = reducer(undefined, {TYPE: '@@redux/INIT'})
  const state2 = reducer(state1, a())

  expect(state2).toEqual(true)
})
