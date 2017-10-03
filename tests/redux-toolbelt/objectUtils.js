import {has, ownKeys} from '../../packages/redux-toolbelt/src/_objectUtils'

test('non object param returns TypeError', () => {
   const res = expect(() =>{
       has(1,'key')
   }).toThrowError(TypeError)

   expect(res.message).toBe('param is not an object')
})

test('object with prop returns true', () => {
   const obj = {name:'david' , age:56}
   expect(has(obj, 'name')).toBe(true)
})

test('object without prop returns false', () => {
   const obj = {name:'david' , age:56}
   expect(has(obj, 'address')).toBe(false)
})

test('ownKeys non object param returns TypeError', () => {
   const res = expect(() =>{
       ownKeys(1)
   }).toThrowError(TypeError)

   expect(res.message).toBe('param is not an object')
})

test('ownKeys returns array with key', () => {
    const obj = {name:'david' , age:55}
    const res= ownKeys(obj)
   expect(Array.isArray(res)).toBe(true)
   expect(res.indexOf('name')>=0).toBe(true)
   expect(res.indexOf('address')==-1).toBe(true)
})










