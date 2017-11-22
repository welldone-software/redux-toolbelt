import isUndefined from 'lodash.isundefined'

import makeAsyncActionCreator from '../../redux-toolbelt/src/makeAsyncActionCreator'

const defaultOptions = {
  defaultMeta: undefined,
  defaultSuccessMeta: undefined,
  defaultFailureMeta: undefined,

  metaGetter: ({ options }) => options.defaultMeta,
  successMetaGetter: ({ initialMeta, options }) => !isUndefined(options.defaultSuccessMeta) ? options.defaultSuccessMeta : initialMeta,
  failureMetaGetter: ({ initialMeta, options }) => !isUndefined(options.defaultFailureMeta) ? options.defaultFailureMeta : initialMeta,

  transformResolve: ({ data }) => Promise.resolve(data),
  transformReject: ({ error }) => Promise.reject(error),

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

  const { transformResolve, transformReject, metaGetter, successMetaGetter, failureMetaGetter, argsMapper } = options
  const actionCreator = makeAsyncActionCreator(baseName, argsMapper)

  const thunkActionCreator = (...asyncFnArgs) => (dispatch, getState) => {
    const initialInformation = {
      options,
      getState,
      dispatch,
      asyncFnArgs,
    }

    const initialMeta = metaGetter(initialInformation)
    dispatch(actionCreator(asyncFnArgs, initialMeta))

    const createAsyncFnPromise = isSuccess => dataOrError => {
      const responseInformation = {
        ...initialInformation,
        initialMeta,
        ...(isSuccess ? { data: dataOrError } : { error: dataOrError }),
      }

      return Promise.resolve()
        .then(() => {
          if(isSuccess){
            const successMeta = successMetaGetter(responseInformation)
            return dispatch(actionCreator.success(dataOrError, successMeta))
          }
          else{
            const failureMeta = failureMetaGetter(responseInformation)
            return dispatch(actionCreator.failure(dataOrError, failureMeta))
          }
        })
        .then(
          dispatchResult => transformResolve({ ...responseInformation, dispatchResult }),
          dispatchError => transformReject({ ...responseInformation, dispatchError })
        )
    }

    return Promise.resolve()
      .then(() => asyncFn(...asyncFnArgs, { ...initialInformation, initialMeta }))
      .then(createAsyncFnPromise(true), createAsyncFnPromise(false))
  }

  Object.keys(actionCreator).forEach(key => (thunkActionCreator[key] = actionCreator[key]))

  return thunkActionCreator
}


makeThunkAsyncActionCreator.withDefaults = userOptions => (baseName, asyncFn, options) => {
  options = Object.assign({}, userOptions, options)
  return makeThunkAsyncActionCreator(baseName, asyncFn, options)
}
