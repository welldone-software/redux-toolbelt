import makeAsyncThunkActionCreator from '../src/makeThunkAsyncActionCreator'
import isActionCreator from '../../redux-toolbelt/src/utils/isActionCreator'

import configureMockStore from 'redux-mock-store'
// import { applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

const noop = () => {}

const mockStore = configureMockStore([thunk])

test('Creates actions with all expected type info and sub action', () => {
  const actionCreatorA = makeAsyncThunkActionCreator('A')
  const actionCreatorB = makeAsyncThunkActionCreator('B', null, x => ({ x }))
  const actionCreatorC = makeAsyncThunkActionCreator('C', null, x => ({ payload: x, meta: x }))

  expect(actionCreatorA.TYPE).toBe('A@ASYNC_REQUEST')
  expect(actionCreatorB.TYPE).toBe('B@ASYNC_REQUEST')
  expect(actionCreatorC.TYPE).toBe('C@ASYNC_REQUEST')
  expect(isActionCreator(actionCreatorA)).toBe(true)
  expect(isActionCreator(actionCreatorB)).toBe(true)
  expect(isActionCreator(actionCreatorC)).toBe(true)

  expect(actionCreatorA.success.TYPE).toBe('A@ASYNC_SUCCESS')
  expect(actionCreatorB.success.TYPE).toBe('B@ASYNC_SUCCESS')
  expect(actionCreatorC.success.TYPE).toBe('C@ASYNC_SUCCESS')
  expect(isActionCreator(actionCreatorA.success)).toBe(true)
  expect(isActionCreator(actionCreatorB.success)).toBe(true)
  expect(isActionCreator(actionCreatorC.success)).toBe(true)

  expect(actionCreatorA.failure.TYPE).toBe('A@ASYNC_FAILURE')
  expect(actionCreatorB.failure.TYPE).toBe('B@ASYNC_FAILURE')
  expect(actionCreatorC.failure.TYPE).toBe('C@ASYNC_FAILURE')
  expect(isActionCreator(actionCreatorA.failure)).toBe(true)
  expect(isActionCreator(actionCreatorB.failure)).toBe(true)
  expect(isActionCreator(actionCreatorC.failure)).toBe(true)
})

test('Creates actions that calls the async function and passes params', () => {
  let asyncResult = null

  const actionCreator = makeAsyncThunkActionCreator('test', v => asyncResult = v)
  const action = actionCreator('b')

  return action(noop, noop)
    .then(() => expect(asyncResult).toBe('b'))
})

test('Handles correctly successful async', () => {
  const actionCreator = makeAsyncThunkActionCreator('A', v => `ping pong ${v}`, { defaultMeta: 'a' })
  const store = mockStore()
  return store.dispatch(actionCreator('b'))
    .then(() => {
      const actions = store.getActions()

      actions.forEach(action => {
        expect(action.meta).toBe('a')
      })

      expect(actions[0].type).toBe(actionCreator.TYPE)
      expect(actions[0].payload).toBe('b')

      expect(actions[1].type).toBe(actionCreator.success.TYPE)
      expect(actions[1].payload).toBe('ping pong b')

      expect(actions.length).toBe(2)
    })
})

test('Handles correctly failed async', () => {
  const actionCreator = makeAsyncThunkActionCreator('A1', v => {throw new Error(v)}, { defaultMeta: 'a1' })
  const store = mockStore()
  return store.dispatch(actionCreator('b1'))
    .catch(() => {
      const actions = store.getActions()

      actions.forEach(action => {
        expect(action.meta).toBe('a1')
      })

      expect(actions[0].type).toBe(actionCreator.TYPE)
      expect(actions[0].payload).toBe('b1')

      expect(actions[1].type).toBe(actionCreator.failure.TYPE)
      expect(actions[1].payload instanceof Error).toBe(true)
      expect(actions[1].payload.message).toBe('b1')

      expect(actions.length).toBe(2)
    })
})

