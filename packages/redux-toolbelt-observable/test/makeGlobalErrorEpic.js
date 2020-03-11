import { of } from 'rxjs'
import { makeGlobalErrorEpic } from '../src'
import {
  makeAsyncActionCreator,
  makeActionCreator,
} from 'redux-toolbelt'

const actionCreator = makeAsyncActionCreator('NameOfAction')
const mappedAction = makeActionCreator('mappedAction')()

describe('', () => {
  let successHandler
  let errorHandler
  beforeEach(() => {
    successHandler = jest.fn()
    errorHandler = jest.fn()
  })

  test('Catches failure and maps to correct action', done => {
    const epic = makeGlobalErrorEpic(() => mappedAction)
    const action$ = of(actionCreator.failure(new Error()))
    epic(action$).subscribe(successHandler, errorHandler, () => {
      expect(successHandler).toBeCalledWith(mappedAction)
      expect(errorHandler).not.toBeCalled()
      done()
    })
  })

  test('Does not catch a failure which has shouldIgnoreGlobalError meta on it', done => {
    const epic = makeGlobalErrorEpic(() => mappedAction)
    const action$ = of(
      actionCreator.failure(new Error(), { shouldIgnoreGlobalError: true })
    )
    epic(action$).subscribe(successHandler, errorHandler, () => {
      expect(successHandler).not.toBeCalled()
      expect(errorHandler).not.toBeCalled()
      done()
    })
  })

  test('Does not catch a loading action', done => {
    const epic = makeGlobalErrorEpic(() => mappedAction)
    const action$ = of(actionCreator())
    epic(action$).subscribe(successHandler, errorHandler, () => {
      expect(successHandler).not.toBeCalled()
      expect(errorHandler).not.toBeCalled()
      done()
    })
  })

  test('Does not catch a success action', done => {
    const epic = makeGlobalErrorEpic(() => mappedAction)
    const action$ = of(actionCreator.success())
    epic(action$).subscribe(successHandler, errorHandler, () => {
      expect(successHandler).not.toBeCalled()
      expect(errorHandler).not.toBeCalled()
      done()
    })
  })
})
