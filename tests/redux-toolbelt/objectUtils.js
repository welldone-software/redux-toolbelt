import {has, ownKeys} from '../../packages/redux-toolbelt/src/_objectUtils'
import test from 'ava'

test('non object param returns TypeError', t => {
   const res = t.throws( () =>{
       has(1,'key')
   },TypeError)

   t.is(res.message,'param is not an object')
})

test('object with prop returns true', t => {
   const obj = {name:'david' , age:56}
   t.is(has(obj, 'name'),true)
})

test('object without prop returns false', t => {
   const obj = {name:'david' , age:56}
   t.is(has(obj, 'address'),false)
})

test('ownKeys non object param returns TypeError', t => {
   const res = t.throws( () =>{
       ownKeys(1)
   },TypeError)

   t.is(res.message,'param is not an object')
})

test('ownKeys returns array with key', t => {
    const obj = {name:'david' , age:55}
    const res= ownKeys(obj)
   t.is(Array.isArray(res) , true)
   t.is (res.indexOf('name')>=0,true)
   t.is (res.indexOf('address')==-1,true)
})










