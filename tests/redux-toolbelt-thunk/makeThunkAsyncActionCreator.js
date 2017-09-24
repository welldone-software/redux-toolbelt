import makeAsyncThunkActionCreator from '../../packages/redux-toolbelt-thunk/src/makeThunkAsyncActionCreator'
import configureMockStore from 'redux-mock-store'
// import { applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import test from 'ava'

const noop = () => {}

const mockStore = configureMockStore([thunk])

test('Creates actions with all expected type info and sub action', t => {
  const actionCreatorA = makeAsyncThunkActionCreator('A')
  const actionCreatorB = makeAsyncThunkActionCreator('B', null, x => ({ x }))
  const actionCreatorC = makeAsyncThunkActionCreator('C', null, x => ({ payload: x, meta: x }))

  t.is(actionCreatorA.TYPE, 'A@ASYNC_REQUEST')
  t.is(actionCreatorB.TYPE, 'B@ASYNC_REQUEST')
  t.is(actionCreatorC.TYPE, 'C@ASYNC_REQUEST')

  t.is(actionCreatorA.success.TYPE, 'A@ASYNC_SUCCESS')
  t.is(actionCreatorB.success.TYPE, 'B@ASYNC_SUCCESS')
  t.is(actionCreatorC.success.TYPE, 'C@ASYNC_SUCCESS')

  t.is(actionCreatorA.failure.TYPE, 'A@ASYNC_FAILURE')
  t.is(actionCreatorB.failure.TYPE, 'B@ASYNC_FAILURE')
  t.is(actionCreatorC.failure.TYPE, 'C@ASYNC_FAILURE')
})

test('Creates actions that calls the async function and passes params', t => {
  let asyncResult = null

  const actionCreator = makeAsyncThunkActionCreator('test', v => asyncResult = v)
  const action = actionCreator('b')

  return action(noop, noop)
    .then(() => t.is(asyncResult, 'b'))
})

test('Handles correctly successful async', t => {
  const actionCreator = makeAsyncThunkActionCreator('A', v => `ping pong ${v}`, { defaultMeta: 'a' })
  const store = mockStore()
  return store.dispatch(actionCreator('b'))
    .then(() => {
      const actions = store.getActions()

      actions.forEach(action => {
        t.is(action.meta, 'a')
      })

      t.is(actions[0].type, actionCreator.TYPE)
      t.is(actions[0].payload, 'b')

      t.is(actions[1].type, actionCreator.success.TYPE)
      t.is(actions[1].payload, 'ping pong b')

      t.is(actions.length, 2)
    })
})

test('Handles correctly failed async', t => {
  const actionCreator = makeAsyncThunkActionCreator('A1', v => {throw new Error(v)}, { defaultMeta: 'a1' })
  const store = mockStore()
  return store.dispatch(actionCreator('b1'))
    .catch(() => {
      const actions = store.getActions()

      actions.forEach(action => {
        t.is(action.meta, 'a1')
      })

      t.is(actions[0].type, actionCreator.TYPE)
      t.is(actions[0].payload, 'b1')

      t.is(actions[1].type, actionCreator.failure.TYPE)
      t.is(actions[1].payload instanceof Error, true)
      t.is(actions[1].payload.message, 'b1', true)

      t.is(actions.length, 2)
    })
})

