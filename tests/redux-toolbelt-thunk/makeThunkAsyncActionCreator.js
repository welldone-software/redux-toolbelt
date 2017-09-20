import makeAsyncThunkActionCreator from '../../packages/redux-toolbelt-thunk/src/makeThunkAsyncActionCreator'

import test from 'ava'


test('Creates actions with all expected type info and sub action', t => {
  //t.fail('xxx')
  const actionCreator = makeAsyncThunkActionCreator('test')
})

test('Creates actions that calls the async function and passes params', t => {
  //t.fail('xxx')
  let b = null

  const actionCreator = makeAsyncThunkActionCreator('test',
    v =>  b = v
  )
  const action = actionCreator('b')

  return action((...rest) => console.log(rest), () => {})
    .then(() => t.is(b, 'b'))

})

test('Passes meta creation parameter to action and sub-actions', t => {
  const actionCreator = makeAsyncThunkActionCreator('test', null, {meta: 'a'})

})

test('Calls thunk function', t => {

})

test('Passes store api to thunk function', t => {

})

test('Dispatches success action with result of thunk function', t => {

})

test('Dispatches success action with result of thunk function', t => {

})
