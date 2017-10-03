import 'babel-polyfill'

import {makeAsyncActionCreator} from '../../packages/redux-toolbelt/src'
import {makeAsyncSaga} from '../../packages/redux-toolbelt-saga/src'

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

test('saga dispatches success actions for a successful request', done => {

  const requestActionCreator = makeAsyncActionCreator('REQUEST')
  const mySaga = makeAsyncSaga(requestActionCreator, mockRequest)

  const store = createStoreForTest(mySaga)
  store.dispatch(requestActionCreator())

  setTimeout(() => {
    expect(store.getActions()).toEqual([
      requestActionCreator(),
      requestActionCreator.success({ 'dummy': 'object' }),
    ])

    done()
  })

})

test('saga dispatches failure actions for a successful request', done => {

  const requestActionCreator = makeAsyncActionCreator('REQUEST')
  const mySaga = makeAsyncSaga(requestActionCreator, mockRequest, {shouldReject: true})

  const store = createStoreForTest(mySaga)
  store.dispatch(requestActionCreator())

  setTimeout(() => {
    expect(store.getActions()).toEqual([
      requestActionCreator(),
      requestActionCreator.failure('some error'),
    ])

    done()
  })

})
