import test from 'ava'

const { createStore, applyMiddleware } = require('redux')

import { makeAsyncActionCreator, makeAsyncReducer } from '../../packages/redux-toolbelt/src'

const createStoreForTest = reducer => {
  const createStoreWithMiddleware = applyMiddleware()(createStore)
  return createStoreWithMiddleware(reducer)
}

test.cb('default store', t => {
  const asyncAction = makeAsyncActionCreator('ASYNC_ACTION')
  const reducer = makeAsyncReducer(asyncAction)
  const store = createStoreForTest(reducer)

  const state = store.getState()
  t.deepEqual(state, {
    error: undefined,
    loading: false,
    data: undefined,
  })

  t.end()
})

test.cb('store with dataProp', t => {
  const asyncAction = makeAsyncActionCreator('ASYNC_ACTION')
  const reducer = makeAsyncReducer(asyncAction, {
    dataProp: 'someDataProp',
  })

  const store = createStoreForTest(reducer)

  let state = store.getState()
  t.deepEqual(state, {
    error: undefined,
    loading: false,
    someDataProp: undefined,
  })

  store.dispatch(asyncAction())
  state = store.getState()
  t.deepEqual(state, {
    loading: true,
    someDataProp: undefined,
  })

  store.dispatch(asyncAction.success(['some-data']))
  state = store.getState()
  t.deepEqual(state, {
    loading: false,
    someDataProp: ['some-data'],
  })

  t.end()
})


test('reducer with dataGetter', t => {
  const asyncAction = makeAsyncActionCreator('ASYNC_ACTION')
  const reducer = makeAsyncReducer(asyncAction, {
    defaultData: ['a'],
    dataGetter: ({data}, {payload}) =>  ([...data, payload]),
  })
  const store = createStoreForTest(reducer)

  let state = store.getState()
  t.deepEqual(state, {
    error: undefined,
    loading: false,
    data: ['a'],
  })

  store.dispatch(asyncAction.success('b'))
  state = store.getState()
  t.deepEqual(state, {
    loading: false,
    data: ['a', 'b'],
  })

})
