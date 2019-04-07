const { createStore, applyMiddleware } = require('redux')

import { makeAsyncActionCreator, makeAsyncReducer } from '../src'

const createStoreForTest = reducer => {
  const createStoreWithMiddleware = applyMiddleware()(createStore)
  return createStoreWithMiddleware(reducer)
}

test('default store', () => {
  const asyncAction = makeAsyncActionCreator('ASYNC_ACTION')
  const reducer = makeAsyncReducer(asyncAction)
  const store = createStoreForTest(reducer)

  const state = store.getState()
  expect(state).toEqual({
    error: undefined,
    loading: false,
    loaded: false,
    data: undefined,
  })
})

test('store with dataProp', () => {
  const asyncAction = makeAsyncActionCreator('ASYNC_ACTION')
  const reducer = makeAsyncReducer(asyncAction, {
    dataProp: 'someDataProp',
  })

  const store = createStoreForTest(reducer)

  let state = store.getState()
  expect(state).toEqual({
    error: undefined,
    loading: false,
    loaded: false,
    someDataProp: undefined,
  })

  store.dispatch(asyncAction())
  state = store.getState()
  expect(state).toEqual({
    loading: true,
    loaded: false,
    someDataProp: undefined,
  })

  store.dispatch(asyncAction.success(['some-data']))
  state = store.getState()
  expect(state).toEqual({
    loading: false,
    loaded: true,
    someDataProp: ['some-data'],
  })
})


test('reducer with dataGetter', () => {
  const asyncAction = makeAsyncActionCreator('ASYNC_ACTION')
  const reducer = makeAsyncReducer(asyncAction, {
    defaultData: ['a'],
    dataGetter: ({data}, {payload}) =>  ([...data, payload]),
  })
  const store = createStoreForTest(reducer)

  let state = store.getState()
  expect(state).toEqual({
    error: undefined,
    loading: false,
    loaded: false,
    data: ['a'],
  })

  store.dispatch(asyncAction.success('b'))
  state = store.getState()
  expect(state).toEqual({
    loading: false,
    loaded: true,
    data: ['a', 'b'],
  })

})
