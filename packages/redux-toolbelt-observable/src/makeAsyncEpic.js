import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/from'
import 'rxjs/add/observable/of'
import 'rxjs/add/observable/throw'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/switchMap'

export default function makeAsyncEpic(actionCreator, asyncFn) {
  return (action$, {getState, dispatch}) =>
    action$.ofType(actionCreator.TYPE)
      .switchMap(action => {
        let obs = undefined
        try{
          obs = asyncFn(action.payload, action.type, action.meta, getState, dispatch)
        }
        catch(e){
          obs = Observable.throw(e)
        }
        if (!obs || !obs.subscribe) {
          obs = Observable.from(obs) //auto detect and convert to observable
        }
        return obs
          .map(payload => actionCreator.success(payload, action.meta))
          .catch(error => Observable.of(actionCreator.failure(error, action.meta)))
      })
}
