import { makeAsyncActionCreator } from '../../redux-toolbelt/src'
import { makeAsyncSaga } from '../src'

import { select } from 'redux-saga/effects'

import createSagaMiddleware from 'redux-saga'
import configureMockStore from 'redux-mock-store'

function createStoreForTest(mySaga, initialState = {}) {
  const sagaMiddleware = createSagaMiddleware()
  const mockStore = configureMockStore([sagaMiddleware])
  const store = mockStore(initialState)
  sagaMiddleware.run(mySaga)
  return store
}

function mockRequest(...args){
  return new Promise((resolve, reject) => {
    if(args[0] === 'fail'){
      reject('failed!')
    }
    else{
      resolve(args)
    }
  })
}

describe('saga dispatches success actions for a successful request', () => {
  test('with no args', done => {
    const requestActionCreator = makeAsyncActionCreator('REQUEST')
    const mySaga = makeAsyncSaga(requestActionCreator, mockRequest)

    const store = createStoreForTest(mySaga)
    store.dispatch(requestActionCreator())

    setImmediate(() => {
      const actualActions = store.getActions()
      expect(actualActions).toEqual([
        requestActionCreator(),
        requestActionCreator.success([]),
      ])
      done()
    })
  })

  test('with args', done => {
    const requestActionCreator = makeAsyncActionCreator('REQUEST')
    const mySaga = makeAsyncSaga(requestActionCreator, mockRequest)

    const store = createStoreForTest(mySaga)
    store.dispatch(requestActionCreator('some-arg'))

    setImmediate(() => {
      const actualActions = store.getActions()
      expect(actualActions).toEqual([
        requestActionCreator('some-arg'),
        requestActionCreator.success(['some-arg']),
      ])
      done()
    })
  })

  test('with pre-set args', done => {
    const requestActionCreator = makeAsyncActionCreator('REQUEST')
    const mySaga = makeAsyncSaga(requestActionCreator, mockRequest, {
      args: ['preset-arg'],
    })

    const store = createStoreForTest(mySaga)
    store.dispatch(requestActionCreator('some-arg'))

    setImmediate(() => {
      const actualActions = store.getActions()
      expect(actualActions).toEqual([
        requestActionCreator('some-arg'),
        requestActionCreator.success(['preset-arg']),
      ])
      done()
    })
  })

  test('with simple args mapping', done => {
    const requestActionCreator = makeAsyncActionCreator('REQUEST')
    const mySaga = makeAsyncSaga(requestActionCreator, mockRequest, {
      mapArgs: () => ['mapped-arg'],
    })

    const store = createStoreForTest(mySaga)
    store.dispatch(requestActionCreator('some-arg'))

    setImmediate(() => {
      const actualActions = store.getActions()
      expect(actualActions).toEqual([
        requestActionCreator('some-arg'),
        requestActionCreator.success(['mapped-arg']),
      ])
      done()
    })
  })

  test('with complex args mapping', done => {
    const initialState = {
      arg0: 'arg0',
    }

    const requestActionCreator = makeAsyncActionCreator('REQUEST')
    const mySaga = makeAsyncSaga(requestActionCreator, mockRequest, {
      mapArgs: function* (action){
        const state = yield select()
        return [state.arg0, action.payload.arg1]
      },
    })

    const store = createStoreForTest(mySaga, initialState)
    store.dispatch(requestActionCreator({arg1: 'arg1'}))

    setImmediate(() => {
      const actualActions = store.getActions()
      expect(actualActions).toEqual([
        requestActionCreator({arg1: 'arg1'}),
        requestActionCreator.success(['arg0', 'arg1']),
      ])
      done()
    })
  })
})

test('saga dispatches failure actions for a failed request', done => {
  const requestActionCreator = makeAsyncActionCreator('REQUEST')
  const mySaga = makeAsyncSaga(requestActionCreator, mockRequest)

  const store = createStoreForTest(mySaga)
  store.dispatch(requestActionCreator('fail'))

  setImmediate(() => {
    const actualActions = store.getActions()
    expect(actualActions).toEqual([
      requestActionCreator('fail'),
      requestActionCreator.failure('failed!'),
    ])
    done()
  })
})
