import makeAsyncActionCreator from '../../redux-toolbelt/src/makeAsyncActionCreator'

const defaultOptions = {
  defaultMeta: undefined,
  metaGetter: ({ options /* asyncFnArgs */ }) => options.defaultMeta,
  transformResolve: ({ data /* dispatchResult, dispatchError, getState, dispatch, asyncFnArgs */ }) => Promise.resolve(data),
  transformReject: ({ error /* dispatchResult, dispatchError, getState, dispatch, asyncFnArgs */ }) => Promise.reject(error),
}

/**
 * Create an async action creator that relies on redux-thunk
 * @param baseName base name of the Action
 * @param asyncFn the async function executed by the thunk
 * @param options {prefix?, defaultMeta?, metaGetter?}
 * @returns {thunkActionCreator}
 */
export default function makeThunkAsyncActionCreator(baseName, asyncFn, userOptions = {}) {
  const actionCreator = makeAsyncActionCreator(baseName)
  const options = Object.assign(defaultOptions, userOptions)
  const { transformResolve, transformReject } = options

  const thunkActionCreator = (...asyncFnArgs) => (dispatch, getState) => {
    const meta = options.metaGetter({ options, asyncFnArgs })
    dispatch(actionCreator(...asyncFnArgs, meta))

    const createAsyncFnPromise = isSuccess => dataOrError => {
      const resolveResultArgs = { getState, dispatch, asyncFnArgs }

      Object.assign(resolveResultArgs, isSuccess ? { data: dataOrError } : { error: dataOrError })

      return Promise.resolve()
        .then(() => dispatch(
          isSuccess ?
            actionCreator.success(dataOrError, meta) :
            actionCreator.failure(dataOrError, meta)
        ))
        .then(
          dispatchResult => transformResolve({ ...resolveResultArgs, dispatchResult }),
          dispatchError => transformReject({ ...resolveResultArgs, dispatchError }),
        )
    }

    return Promise.resolve()
      .then(() => asyncFn(...asyncFnArgs, { getState, dispatch }))
      .then(createAsyncFnPromise(true), createAsyncFnPromise(false))
  }

  Object.keys(actionCreator).forEach(key => (thunkActionCreator[key] = actionCreator[key]))

  return thunkActionCreator
}


makeThunkAsyncActionCreator.withDefaults = ({ prefix = '', defaultMeta, metaGetter }) => (baseName, asyncFn, options) => {
  options = Object.assign({}, { prefix, defaultMeta, metaGetter }, options)
  return makeThunkAsyncActionCreator(baseName, asyncFn, options)
}
