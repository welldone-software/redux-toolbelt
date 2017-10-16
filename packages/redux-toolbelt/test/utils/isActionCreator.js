import { isActionCreator, makeAsyncActionCreator, makeActionCreator } from '../../src'

test('action creator is identified', () => {
  const a = makeActionCreator('A')
  expect(isActionCreator(a)).toEqual(true)
})

test('async action creator is identified', () => {
  const a = makeAsyncActionCreator('A')

  expect(isActionCreator(a)).toEqual(true)
  expect(isActionCreator(a.success)).toEqual(true)
  expect(isActionCreator(a.failure)).toEqual(true)
  expect(isActionCreator(a.progress)).toEqual(true)
  expect(isActionCreator(a.cancel)).toEqual(true)
})

test('simple function is not an action creator', () => {
  const funcs = [
    function(){
      return 'bar'
    },
    function foo(){
      return 'bar'
    },
    () => 'bar',
  ]

  funcs.forEach(func => {
    expect(isActionCreator(func)).toEqual(false)
  })
})

test('an object is not an action creator', () => {
  const objs = [
    {},
    new Object(),
    {
      TYPE: 'type',
    },
    {
      toString: () => 'type',
    },
    {
      TYPE: 'type',
      toString: () => 'type',
    },
  ]

  objs.forEach(obj => {
    expect(isActionCreator(obj)).toEqual(false)
  })
})

