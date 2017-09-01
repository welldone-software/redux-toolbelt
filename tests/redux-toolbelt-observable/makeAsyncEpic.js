import {makeAsyncActionCreator} from '../../packages/redux-toolbelt/src'
import {makeAsyncEpic} from '../../packages/redux-toolbelt-observable/src'

import test from 'ava'

import { Observable } from 'rxjs/Observable'
import configureMockStore from 'redux-mock-store'
import {createEpicMiddleware} from 'redux-observable'

const actionCreator = makeAsyncActionCreator('FETCH')

const createStoreForTest = (asyncFunc) => {
  const epic = makeAsyncEpic(actionCreator, asyncFunc)
  const epicMiddleware = createEpicMiddleware(epic)
  const createMockStore = configureMockStore([epicMiddleware])
  return createMockStore()
}

test.cb('Dispatches success action for resolved promise', t => {
  const store = createStoreForTest(() => Promise.resolve(5))
  store.dispatch(actionCreator())

  setTimeout(() => {
    t.deepEqual(store.getActions(), [
      actionCreator(),
      actionCreator.success(5),
    ])

    t.end()
  })
})

test.cb('Dispatches failure action for rejected promise', t => {
  const store = createStoreForTest(() => Promise.reject(7))
  store.dispatch(actionCreator())

  setTimeout(() => {
    t.deepEqual(store.getActions(), [
      actionCreator(),
      actionCreator.failure(7),
    ])

    t.end()
  })
})

test.cb('Dispatches failure action for exceptions', t => {
  const error = new Error('Error object for test')
  const store = createStoreForTest(() => { throw error })
  store.dispatch(actionCreator())

  setTimeout(() => {
    t.deepEqual(store.getActions(), [
      actionCreator(),
      actionCreator.failure(error),
    ])

    t.end()
  })
})

test.cb('Dispatches success actions for observables', t => {
  const store = createStoreForTest(() => Observable.from([3, 5, 7]))
  store.dispatch(actionCreator())

  setTimeout(() => {
    t.deepEqual(store.getActions(), [
      actionCreator(),
      actionCreator.success(3),
      actionCreator.success(5),
      actionCreator.success(7),
    ])

    t.end()
  })
})
