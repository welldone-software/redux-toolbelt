import { from, throwError, of } from 'rxjs'
import { ofType } from 'redux-observable'
import { mergeMap, map, catchError } from 'rxjs/operators'

export default function makeAsyncEpic(actionCreator, asyncFn) {
  return (action$, state$) =>
    action$.pipe(
      ofType(actionCreator.TYPE),
      mergeMap(action => {
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

        return obs.pipe(
          map(payload => actionCreator.success(payload, action.meta)),
          catchError(error => of(actionCreator.failure(error, action.meta))),
        )
      }),
    )
}
