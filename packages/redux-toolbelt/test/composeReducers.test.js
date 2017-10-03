import {composeReducers, makeReducer, makeActionCreator} from '../../packages/redux-toolbelt/src'

function r1(s = 1, {type} = {type: 'noop'}) {
  switch (type) {
    case 'A':
      return s + 3
    default:
      return s
  }
}

function r2(s = 10, {type} = {type: 'noop'}) {
  switch (type) {
    case 'A':
      return s + 30
    default:
      return s
  }
}

const r1r2 = composeReducers(r1, r2)
const r2r1 = composeReducers(r2, r1)
const action = {type: 'A'}



test('default state not applied when value supplied', () => {
  [r1r2, r2r1].forEach(f => {
    [100, 0, null]
      .forEach(v => expect(f(v, action)).toBe(33 + v))
  })
})

test('default state is applied when not supplied', () => {
  [r1r2, r2r1].forEach((f) => {
    expect(f(undefined, action)).toBe(33 + f())
  })
})

test('compose reducers made by makeReducers with only mapping', () => {
  const setUserName = makeActionCreator('SET_USER_NAME')
  const toggleShow = makeActionCreator('TOGGLE_SHOW')

  const reducer = composeReducers({
    userName: makeReducer(setUserName),
    show: makeReducer(toggleShow, state => !state, {defaultState: true}),
  })

  const initialState = reducer(undefined, {type: '@@redux/INIT'})
  expect(initialState).toEqual({
    userName: null,
    show: true,
  })

  const state1 = reducer(initialState, setUserName('test-user-name'))
  expect(state1).toEqual({
    userName: 'test-user-name',
    show: true,
  })

  const state2 = reducer(state1, toggleShow())
  expect(state2).toEqual({
    userName: 'test-user-name',
    show: false,
  })
})

//
// test('default state is applied when state is undefined', t => {
//
//   t.is(r1r2(undefined, action), 3)
//   t.is(r2r1(undefined, action), 4)
//
//
//   // const expected3 = 3
//   // const r4 = composeReducers(r2, r1)
//   // const expected4 = 4
//   //
//   // Array.of(null, undefined).forEach(v => {
//   //   t.is(r3(v, {type: 'A'}), expected3)
//   //
//   //   //t.is(r4(v, {type: 'A'}), expected4)
//   // })
//
//
// })
//
// test('default state not applied when state is 0', t => {
//
//   const r3 = composeReducers(r1, r2)
//
//   const result = r3(0, {type: 'A'})
//
//   t.is(result, 2)
//
// })
// import 'mocha'
// import assert from 'assert'
// import composeReducers from './composeReducers'
//
// describe('my test', function(){
//   function r1(s, {type}){
//     switch(type){
//       case 'A':
//         return s + 1
//       default:
//         return s
//     }
//   }
//
//   function r2(s, {type}){
//     switch(type){
//       case 'A':
//         return s + 1
//       default:
//         return s
//     }
//   }
//
//   const r3 = composeReducers(r1, r2)
//
//   const result = r3(0, {type: 'A'})
//
//   assert(result === 3)
// })
