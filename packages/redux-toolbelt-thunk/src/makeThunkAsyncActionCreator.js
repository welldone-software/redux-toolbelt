import { makeAsyncActionCreator } from 'redux-toolbelt'

/**
 * Create an async action creator that relies on redux-thunk
 * @param baseName base name of the Action
 * @param asyncFn the async function executed by the thunk
 * @param options {prefix?, defaultMeta?, metaGetter?}
 * @returns {thunkActionCreator}
 */
export default function makeThunkAsyncActionCreator(baseName, asyncFn, options = {}) {
  const actionCreator = makeAsyncActionCreator(baseName)

  const thunkActionCreator = function (...rest) {
    const action = (dispatch, getState) => {
      let meta = options.metaGetter && options.metaGetter(...rest) || options.defaultMeta
      dispatch(actionCreator(...rest, meta))
      return Promise.resolve()
        .then(() => asyncFn(...rest, { getState, dispatch }))
        .then(data => {
          dispatch(actionCreator.success(data, meta))
        })
        .catch(err => {
          dispatch(actionCreator.failure(err, meta))
          throw err
        })
    }
    return action
  }

  Object.keys(actionCreator).forEach(key => (thunkActionCreator[key] = actionCreator[key]))

  return thunkActionCreator
}


makeThunkAsyncActionCreator.withDefaults = ({ prefix = '', defaultMeta, metaGetter }) => (baseName, asyncFn, options) => {
  options = Object.assign({}, { prefix, defaultMeta, metaGetter }, options)
  return makeThunkAsyncActionCreator(baseName, asyncFn, options)
}
