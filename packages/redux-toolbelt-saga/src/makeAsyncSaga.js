import { call, put, takeLatest } from 'redux-saga/effects'

/**
 * @param {AsyncActionCreator} asyncActionCreator
 * @param {function} fn
 * @param {...*} [args]
 */
export default function makeAsyncSaga(asyncActionCreator, fn, ...args){
  function* exec(){
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
