import makeAsyncActionCreator from '../../redux-toolbelt/src/makeAsyncActionCreator'
import { getOptions } from '../../redux-toolbelt/src/utils'

/**
 * Create an async action creator that relies on redux-thunk
 *
 * @typedef {function(*, *): {type: string, payload: *, meta: *}} thunkAsyncActionCreator
 * @property {string} TYPE - action type
 *
 * @param baseName base name of the Action
 * @param asyncFn the async function executed by the thunk
 * @param [argsMapper]
 * @param [options]: {prefix?, defaultMeta?, metaGetter?}
 *
 * @returns {thunkAsyncActionCreator}
 */
export default function makeThunkAsyncActionCreator(baseName, asyncFn, argsMapper, options) {
  options = getOptions({ argsMapper, options })

  const actionCreator = makeAsyncActionCreator(baseName, options)

  const thunkActionCreator = (...asyncFnArgs) => (dispatch, getState) => {

    dispatch(actionCreator(...asyncFnArgs))
    return Promise.resolve()
      .then(() => asyncFn(...asyncFnArgs, {getState, dispatch}))
      .then(data => {
        return Promise.resolve(dispatch(actionCreator.success(data)))
          .then(() => data)
      })
      .catch(err => {
        return Promise.resolve(dispatch(actionCreator.failure(err)))
          .then(() => Promise.reject(err))
      })
  }

  Object.keys(actionCreator).forEach(key => (thunkActionCreator[key] = actionCreator[key]))

  return thunkActionCreator
}


makeThunkAsyncActionCreator.withDefaults = userOptions => (baseName, asyncFn, options) => {
  options = Object.assign({}, userOptions, options)
  return makeThunkAsyncActionCreator(baseName, asyncFn, options)
}
