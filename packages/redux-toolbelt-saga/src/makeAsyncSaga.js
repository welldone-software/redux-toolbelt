import { call, put, takeLatest } from 'redux-saga/effects'

/**
 * @param {AsyncActionCreator} asyncActionCreator
 * @param {function} fn
 * @param options? = {mapArgs?, args?})
 *
 * @returns {Function}
 */
export default function makeAsyncSaga(asyncActionCreator, fn, options = {}){
  function* exec(action){

    const args = yield getArgs(action, options)
    if(!Array.isArray(args)){
      throw new Error(`makeAsyncSaga expected an array of args, instead got: ${args}`)
    }

    try {
      const result = yield call(fn, ...args)
      yield put(asyncActionCreator.success(result))
    }
    catch(error){
      yield put(asyncActionCreator.failure(error))
    }
  }

  function* waitFor(){
    yield takeLatest(asyncActionCreator.TYPE, exec)
  }

  return waitFor
}


function* getArgs(action, options){
  if (options.mapArgs){
    return yield options.mapArgs(action)
  }

  if (options.args){
    return options.args
  }

  if (action.payload){
    return [action.payload]
  }

  return []
}
