import makeAsyncThunkActionCreator from '../../packages/redux-toolbelt-thunk/src/makeThunkAsyncActionCreator'

import test from 'ava'


test('Creates actions with all expected type info and sub action', t => {
  const actionCreatorA = makeAsyncThunkActionCreator('A')
  const actionCreatorB = makeAsyncThunkActionCreator('B',null,x => ({x}))
  const actionCreatorC = makeAsyncThunkActionCreator('C',null, x => ({payload: x, meta: x}))

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

  const actionCreator = makeAsyncThunkActionCreator('test',v =>  asyncResult = v)
  const action = actionCreator('b')

  return action(() => {}, () => {})
    .then(() => t.is(asyncResult, 'b'))
})

test('Passes meta creation parameter to action and sub-actions', t => {
  let asyncMeta = null  
  const actionCreator = makeAsyncThunkActionCreator('A',v =>v,{defaultMeta:'a'})
  const action = actionCreator('b')

  return action((rest) => asyncMeta = rest, () => {}).then(t.is(asyncMeta.meta,'a'))

})

// test('Calls thunk function', t => {

// })

// test('Passes store api to thunk function', t => {

// })

test('Dispatches success action with result of thunk function', t => {
  
  let asyncResult = null
  
  const actionCreator = makeAsyncThunkActionCreator('test',v =>  asyncResult = v)
  const action = actionCreator('b')
  
  return action(() => {}, () => {})
    .then(x=>t.is(x.type,'test@ASYNC_SUCCESS'))
})
