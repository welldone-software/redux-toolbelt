import {makeActionCreator} from '../lib'
import test from 'ava'


test('type is assigned', t => {

  const a = makeActionCreator('A')

  t.is(a.TYPE, 'A')

})


test('no mapping', t => {

  const a = makeActionCreator('A')

  t.deepEqual(a(), {type: 'A', payload: undefined, meta: undefined})
  t.deepEqual(a(undefined, 'm'), {type: 'A', payload: undefined, meta: 'm'})
  t.deepEqual(a('p'), {type: 'A', payload: 'p', meta: undefined})
  t.deepEqual(a('p', 'm'), {type: 'A', payload: 'p', meta: 'm'})

})

test('short mapping', t => {

  const a = makeActionCreator('A', x => ({x}))

  t.deepEqual(a(), {type: 'A', payload: {x: undefined}, meta: undefined})
  t.deepEqual(a(4), {type: 'A', payload: {x: 4}, meta: undefined})
  t.deepEqual(a({y: '5'}), {type: 'A', payload: {x: {y: '5'} }, meta: undefined})

})

test('full mapping, payload and meta', t => {

  const a = makeActionCreator('A', x => ({payload: x, meta: x}))
  const b = makeActionCreator('B', x => ({payload: x, meta: undefined}))
  const c = makeActionCreator('C', x => ({payload: undefined, meta: x}))

  t.deepEqual(a(), {type: 'A', payload: undefined, meta: undefined})
  t.deepEqual(a(4), {type: 'A', payload: 4, meta: 4})
  t.deepEqual(a({y: '5'}), {type: 'A', payload: {y: '5'}, meta: {y: '5'}})

  t.deepEqual(b(), {type: 'B', payload: undefined, meta: undefined})
  t.deepEqual(b(4), {type: 'B', payload: 4, meta: undefined})
  t.deepEqual(b({y: '5'}), {type: 'B', payload: {y: '5'}, meta: undefined})

  t.deepEqual(c(), {type: 'C', payload: undefined, meta: undefined})
  t.deepEqual(c(4), {type: 'C', payload: undefined, meta: 4})
  t.deepEqual(c({y: '5'}), {type: 'C', payload: undefined, meta: {y: '5'}})

})


test('full mapping, missing meta/payload fails', t => {

  const a = makeActionCreator('A', x => ({payload: x}))
  const b = makeActionCreator('B', x => ({meta: x}))

  t.throws(() => a())
  t.throws(() => a(4))
  t.throws(() => a({y: '5'}))

  t.throws(() => b())
  t.throws(() => b(4))
  t.throws(() => b({y: '5'}))
})


test('withDefaults prefix', t => {

  const myMakeActionCreator = makeActionCreator.withDefaults({prefix: 'x@'})

  const a = myMakeActionCreator('A')
  const b = myMakeActionCreator('B', z => ({z}))
  const c = myMakeActionCreator('C', z => ({payload: z, meta: z}))

  t.deepEqual(a(), {type: 'x@A', payload: undefined, meta: undefined})

  t.deepEqual(b(), {type: 'x@B', payload: {z: undefined}, meta: undefined})

  t.deepEqual(c(), {type: 'x@C', payload: undefined, meta: undefined})
})


test('withDefaults defaultMeta', t => {

  const myMakeActionCreator = makeActionCreator.withDefaults({defaultMeta: {opt: 1}})

  const a = myMakeActionCreator('A')
  const b = myMakeActionCreator('B', z => ({z}))
  const c = myMakeActionCreator('C', z => ({payload: z, meta: z}))

  t.deepEqual(a(), {type: 'A', payload: undefined, meta: {opt: 1}})

  t.deepEqual(b(), {type: 'B', payload: {z: undefined}, meta: {opt: 1}})

  t.deepEqual(c(), {type: 'C', payload: undefined, meta: {opt: 1}})

  t.deepEqual(c({x: 2}), {type: 'C', payload: {x: 2}, meta: {opt: 1, x: 2}})

})


