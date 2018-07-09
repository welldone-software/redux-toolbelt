import {makeAsyncActionCreator} from '../../redux-toolbelt/src'
import {makeAsyncEpic} from '../src'

import { from } from 'rxjs'
import configureMockStore from 'redux-mock-store'
import {createEpicMiddleware} from 'redux-observable'

const actionCreator = makeAsyncActionCreator('FETCH')

const createStoreForTest = (asyncFunc) => {
  const epic = makeAsyncEpic(actionCreator, asyncFunc)
  const epicMiddleware = createEpicMiddleware()
  const createMockStore = configureMockStore([epicMiddleware])
  const store = createMockStore()
  epicMiddleware.run(epic)
  return store
}

test('Dispatches success action for resolved promise', done => {
  const store = createStoreForTest(() => Promise.resolve(5))
  store.dispatch(actionCreator())

  setImmediate(() => {
    expect(store.getActions()).toEqual([
      actionCreator(),
      actionCreator.success(5),
    ])

    done()
  })
})

test('Dispatches failure action for rejected promise', done => {
  const store = createStoreForTest(() => Promise.reject(7))
  store.dispatch(actionCreator())

  setImmediate(() => {
    expect(store.getActions()).toEqual([
      actionCreator(),
      actionCreator.failure(7),
    ])
    done()
  })
})

test('Dispatches failure action for exceptions', () => {
  const error = new Error('Error object for test')
  const store = createStoreForTest(() => { throw error })
  store.dispatch(actionCreator())

  expect(store.getActions()).toEqual([
    actionCreator(),
    actionCreator.failure(error),
  ])
})

test('Dispatches success actions for observables', () => {
  const store = createStoreForTest(() => from([3, 5, 7]))
  store.dispatch(actionCreator())

  expect(store.getActions()).toEqual([
    actionCreator(),
    actionCreator.success(3),
    actionCreator.success(5),
    actionCreator.success(7),
  ])
})
