import {makeAsyncActionCreator} from 'redux-toolbelt'
import {makeAsyncEpic} from '../src'

import { from } from 'rxjs'
import configureMockStore from 'redux-mock-store'
import {createEpicMiddleware} from 'redux-observable'

const actionCreator = makeAsyncActionCreator('FETCH')

const createStoreForTest = (asyncFunc, options) => {
  const epic = makeAsyncEpic(actionCreator, asyncFunc, options)
  const epicMiddleware = createEpicMiddleware()
  const createMockStore = configureMockStore([epicMiddleware])
  const store = createMockStore()
  epicMiddleware.run(epic)
  return store
}

test('Dispatches success action for resolved promise', done => {
  const store = createStoreForTest(() => Promise.resolve(5))
  store.dispatch(actionCreator())

  const actions = store.getActions()

  setImmediate(() => {
    expect(actions[0].type).toBe(actionCreator.TYPE)

    expect(actions[1].type).toBe(actionCreator.success.TYPE)
    expect(actions[1].payload).toBe(5)

    done()
  })
})

test('Dispatches failure action for rejected promise', done => {
  const store = createStoreForTest(() => Promise.reject(7))
  store.dispatch(actionCreator())

  const actions = store.getActions()

  setImmediate(() => {
    expect(actions[0].type).toBe(actionCreator.TYPE)

    expect(actions[1].type).toBe(actionCreator.failure.TYPE)
    expect(actions[1].payload).toBe(7)

    done()
  })
})

test('Dispatches failure action for exceptions', done => {
  const error = new Error('Error object for test')
  const store = createStoreForTest(() => { throw error })
  store.dispatch(actionCreator())

  const actions = store.getActions()

  setImmediate(() => {
    expect(actions[0].type).toBe(actionCreator.TYPE)

    expect(actions[1].type).toBe(actionCreator.failure.TYPE)
    expect(actions[1].payload).toEqual(error)

    done()
  })
})

test('Dispatches success actions for observables', done => {
  const store = createStoreForTest(() => from([3, 5, 7]))
  store.dispatch(actionCreator())

  const actions = store.getActions()

  setImmediate(() => {
    expect(actions[0].type).toBe(actionCreator.TYPE)

    expect(actions[1].type).toBe(actionCreator.success.TYPE)
    expect(actions[1].payload).toBe(3)

    expect(actions[2].type).toBe(actionCreator.success.TYPE)
    expect(actions[2].payload).toBe(5)

    expect(actions[3].type).toBe(actionCreator.success.TYPE)
    expect(actions[3].payload).toBe(7)

    expect(actions).toHaveLength(4)

    done()
  })
})

test('Dispatches few success actions for resolved promises', done => {
  const store = createStoreForTest(() => Promise.resolve(5))
  store.dispatch(actionCreator({a: true}))
  store.dispatch(actionCreator({b: true}))

  const actions = store.getActions()

  setImmediate(() => {
    expect(actions[0].type).toBe(actionCreator.TYPE)
    expect(actions[0].payload).toEqual({a: true})
    expect(actions[0].meta).toBe(undefined)

    expect(actions[1].type).toBe(actionCreator.TYPE)
    expect(actions[1].payload).toEqual({b: true})
    expect(actions[1].meta).toBe(undefined)

    expect(actions[2].type).toBe(actionCreator.success.TYPE)
    expect(actions[2].payload).toBe(5)
    expect(actions[2].meta).toEqual({_toolbeltAsyncFnArgs: {a: true}})

    expect(actions[3].type).toBe(actionCreator.success.TYPE)
    expect(actions[3].payload).toBe(5)
    expect(actions[3].meta).toEqual({_toolbeltAsyncFnArgs: {b: true}})

    expect(actions).toHaveLength(4)

    done()
  })
})

test('Dispatches few success actions for resolved promises and cancel previous requests', done => {
  const store = createStoreForTest(() => Promise.resolve(5), {ignoreOlderParallelResolves: true})
  store.dispatch(actionCreator({a: true}))
  store.dispatch(actionCreator({b: true}))

  const actions = store.getActions()

  setImmediate(() => {
    expect(actions[0].type).toBe(actionCreator.TYPE)
    expect(actions[0].payload).toEqual({a: true})
    expect(actions[0].meta).toBe(undefined)

    expect(actions[1].type).toBe(actionCreator.TYPE)
    expect(actions[1].payload).toEqual({b: true})
    expect(actions[1].meta).toBe(undefined)

    expect(actions[2].type).toBe(actionCreator.success.TYPE)
    expect(actions[2].payload).toBe(5)
    expect(actions[2].meta).toEqual({_toolbeltAsyncFnArgs: {b: true}})

    expect(actions).toHaveLength(3)

    done()
  })
})

test('Dispatches actions for resolved promises and cancel requests', done => {
  const store = createStoreForTest(() => Promise.resolve(5))
  store.dispatch(actionCreator({a: true}))
  store.dispatch(actionCreator({b: true}))
  store.dispatch(actionCreator.cancel())

  const actions = store.getActions()

  setImmediate(() => {
    expect(actions[0].type).toBe(actionCreator.TYPE)
    expect(actions[0].payload).toEqual({a: true})

    expect(actions[1].type).toBe(actionCreator.TYPE)
    expect(actions[1].payload).toEqual({b: true})

    expect(actions[2].type).toBe(actionCreator.cancel.TYPE)

    expect(actions).toHaveLength(3)

    done()
  })
})
