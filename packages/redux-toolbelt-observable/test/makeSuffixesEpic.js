import { of } from 'rxjs'
import { makeActionCreator } from '../../redux-toolbelt/src'
import { makeSuffixesEpic } from '../src'

const mappedAction = makeActionCreator('mappedAction')()

describe('', () => {
  let successHandler
  let errorHandler
  beforeEach(() => {
    successHandler = jest.fn()
    errorHandler = jest.fn()
  })

  test('Catches suffix and maps to correct action', done => {
    const epic = makeSuffixesEpic(() => mappedAction, ['@A', '#A', 'AA']) ///
    const action$ = of(
      { type: '1@A' },
      { type: '33322@A' },
      { type: '1#A' },
      { type: '1AA' }
    )
    epic(action$).subscribe(successHandler, errorHandler, () => {
      expect(successHandler).toBeCalledTimes(4)
      successHandler.mock.calls.forEach(args =>
        expect(args[0]).toBe(mappedAction)
      )
      expect(errorHandler).not.toBeCalled()
      done()
    })
  })

  test('Does not cach wrong suffix', done => {
    const epic = makeSuffixesEpic(() => mappedAction, ['@A', '#A', 'AA']) ///
    const action$ = of(
      { type: '1bb' },
      { type: '1AAb' },
      { type: '1@AB' },
      { type: '1bb@#BA' },
      { type: 'vsdffsgffgds gfsg  g1AAb' },
      { type: '1@AB' }
    )
    epic(action$).subscribe(successHandler, errorHandler, () => {
      expect(successHandler).not.toBeCalled()
      expect(errorHandler).not.toBeCalled()
      done()
    })
  })
})
