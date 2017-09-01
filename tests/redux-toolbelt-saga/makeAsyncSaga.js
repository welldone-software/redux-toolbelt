import 'babel-polyfill'

import {makeAsyncActionCreator} from '../../packages/redux-toolbelt/src'
import {makeAsyncSaga} from '../../packages/redux-toolbelt-saga/src'

import test from 'ava'

import createSagaMiddleware from 'redux-saga'
import configureMockStore from 'redux-mock-store'

function createStoreForTest(mySaga) {
  const sagaMiddleware = createSagaMiddleware()
  const mockStore = configureMockStore([sagaMiddleware])
  const store = mockStore()
  sagaMiddleware.run(mySaga)
  return store
}

function mockRequest({shouldReject = false} = {}){
  return Promise.resolve().then(() => {
    if(shouldReject){
      throw 'some error'
    }
    return { 'dummy': 'object' }
  })
}

test.cb('saga dispatches success actions for a successful request', t => {

  const requestActionCreator = makeAsyncActionCreator('REQUEST')
  const mySaga = makeAsyncSaga(requestActionCreator, mockRequest)

  const store = createStoreForTest(mySaga)
  store.dispatch(requestActionCreator())

  setTimeout(() => {
    t.deepEqual(store.getActions(), [
      requestActionCreator(),
      requestActionCreator.success({ 'dummy': 'object' }),
    ])

    t.end()
  })

})

test.cb('saga dispatches failure actions for a successful request', t => {

  const requestActionCreator = makeAsyncActionCreator('REQUEST')
  const mySaga = makeAsyncSaga(requestActionCreator, mockRequest, {shouldReject: true})

  const store = createStoreForTest(mySaga)
  store.dispatch(requestActionCreator())

  setTimeout(() => {
    t.deepEqual(store.getActions(), [
      requestActionCreator(),
      requestActionCreator.failure('some error'),
    ])

    t.end()
  })

})
