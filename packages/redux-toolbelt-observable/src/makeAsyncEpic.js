import { from, throwError, of } from 'rxjs'
import { ofType } from 'redux-observable'
import { mergeMap, switchMap, map, catchError, takeUntil } from 'rxjs/operators'

export default function makeAsyncEpic(actionCreator, asyncFn, {cancelPreviousFunctionCalls = false} = {}) {
  const mapFunction = cancelPreviousFunctionCalls ? switchMap : mergeMap
  return (action$, state$) =>
    action$.pipe(
      ofType(actionCreator.TYPE),
      mapFunction(action => {
        let obs = undefined
        try{
          obs = asyncFn(action.payload, action.type, action.meta, state$)
        }
        catch(e){
          obs = throwError(e)
        }
        if (!obs || !obs.subscribe) {
          obs = from(obs) //auto detect and convert to observable
        }

        const { payload, meta: origMeta = {} } = action
        const meta = { ...origMeta, _toolbeltAsyncFnArgs: payload }

        return obs.pipe(
          takeUntil(action$.ofType(actionCreator.cancel.TYPE)),
          map(payload => actionCreator.success(payload, meta)),
          catchError(error => of(actionCreator.failure(error, meta))),
        )
      }),
    )
}
