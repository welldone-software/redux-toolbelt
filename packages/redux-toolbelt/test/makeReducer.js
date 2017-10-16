import { makeReducer, makeActionCreator } from '../src'

test('trivial', () => {
  const a = makeActionCreator('A')

  const reducer = makeReducer(a)

  const state = reducer({}, a('test'))

  expect(state).toEqual('test')
})

test('default state', () => {
  const a = makeActionCreator('A')

  const reducer = makeReducer(a, { defaultState: false })

  const state = reducer(undefined, { TYPE: 'something' })

  expect(state).toEqual(false)
})

test('function', () => {
  const a = makeActionCreator('A')

  const reducer = makeReducer(a, (state, { payload }) => `${state}->${payload}`)

  const state = reducer('initial', a('test'))

  expect(state).toEqual('initial->test')
})

test('function and default state', () => {
  const a = makeActionCreator('A')

  const reducer = makeReducer(a, state => !state)

  const state1 = reducer(undefined, { TYPE: '@@redux/INIT' })
  const state2 = reducer(state1, a())

  expect(state2).toEqual(true)
})

test('multiple actions handling', () => {
  const increaseBy = makeActionCreator('INCREASE_BY')
  const decreaseBy = makeActionCreator('DECREASE_BY')

  const reducer = makeReducer({
    [increaseBy]: (state, {payload}) => state + payload,
    [decreaseBy.TYPE]: (state, {payload}) => state - payload,
  }, { defaultState: 100 })

  let state = reducer(undefined, { type: '@@redux/INIT' })
  expect(state).toEqual(100)

  state = reducer(state, increaseBy(10))
  expect(state).toEqual(110)

  state = reducer(state, decreaseBy(20))
  expect(state).toEqual(90)

  state = reducer(state, { type: 'RANDOM_ACTION' })
  expect(state).toEqual(90)
})

test('multiple creators', () => {
  const increaseBy = makeActionCreator('INCREASE_BY')
  const decreaseBy = makeActionCreator('DECREASE_BY')

  const countUpdatedReducer = makeReducer(
    [increaseBy, decreaseBy],
    (state, { payload }) => state || payload !== 0,
    { defaultState: false }
  )

  let state = countUpdatedReducer(undefined, { type: '@@redux/INIT' })
  expect(state).toEqual(false)

  state = countUpdatedReducer(state, increaseBy(0))
  expect(state).toEqual(false)

  state = countUpdatedReducer(state, decreaseBy(20))
  expect(state).toEqual(true)

  state = countUpdatedReducer(state, increaseBy(20))
  expect(state).toEqual(true)

  state = countUpdatedReducer(state, increaseBy(0))
  expect(state).toEqual(true)
})
