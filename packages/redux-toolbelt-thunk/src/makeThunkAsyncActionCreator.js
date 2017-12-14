import makeAsyncActionCreator from '../../redux-toolbelt/src/makeAsyncActionCreator'

const defaultOptions = {
  defaultMeta: undefined,

  metaGetter: ({ options }) => options.defaultMeta,

  argsMapper: (asyncFnArgs, initialMeta) => ({
    payload: asyncFnArgs[0],
    meta: asyncFnArgs.length > 1 ? asyncFnArgs[1] : initialMeta,
  }),
}

/**
 * Create an async action creator that relies on redux-thunk
 * @param baseName base name of the Action
 * @param asyncFn the async function executed by the thunk
 * @param options {prefix?, defaultMeta?, metaGetter?}
 * @returns {thunkActionCreator}
 */
export default function makeThunkAsyncActionCreator(baseName, asyncFn, userOptions = {}) {
  const options = Object.assign({}, defaultOptions, userOptions)

  const { metaGetter, argsMapper } = options
  const meta = metaGetter({ options })

  const actionCreator = makeAsyncActionCreator(baseName, argsMapper)

  const thunkActionCreator = (...asyncFnArgs) => (dispatch, getState) => {

    dispatch(actionCreator(asyncFnArgs, meta))

    return Promise.resolve()
      .then(() => asyncFn(...asyncFnArgs, {getState, dispatch}))
      .then(data => {
        dispatch(actionCreator.success(data, meta))
        return data
      })
      .catch(err => {
        dispatch(actionCreator.failure(err, meta))
        return Promise.reject(err)
      })
  }

  Object.keys(actionCreator).forEach(key => (thunkActionCreator[key] = actionCreator[key]))

  return thunkActionCreator
}


makeThunkAsyncActionCreator.withDefaults = userOptions => (baseName, asyncFn, options) => {
  options = Object.assign({}, userOptions, options)
  return makeThunkAsyncActionCreator(baseName, asyncFn, options)
}
