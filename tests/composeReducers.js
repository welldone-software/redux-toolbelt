import {composeReducers} from '../packages/utils'

import test from 'ava'

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



test('default state not applied when value supplied', t => {
  [r1r2, r2r1].forEach(f => {
    [100, 0, null]
      .forEach(v => t.is(f(v, action), 33 + v))
  })
})

test('default state is applied when not supplied', t => {
  [r1r2, r2r1].forEach((f) => {
    t.is(f(undefined, action), 33 + f())
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
