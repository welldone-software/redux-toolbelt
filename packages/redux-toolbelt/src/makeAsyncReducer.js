/**
 *
 * @param actionCreator
 * @param options = {dataProp , shouldDestroyData, defaultData, shouldSpread, shouldSetData, dataGetter})
 * @returns {Function}
 */
export default function makeAsyncReducer(actionCreator, options) {
  const defaults = {
    dataProp: 'data',
    shouldDestroyData: true,
    shouldDestroyDataOnError: true,
    shouldSetError: true,
    defaultData: undefined,
    shouldSpread: false,
    shouldSetData: true,
    dataGetter: undefined,
    saveAsyncFnArgs: false,
  }
  options = Object.assign(defaults, options)

  const defaultState = options.shouldSpread ?
    { error: undefined, loading: false, loaded: false, ...(options.defaultData || {}) } :
    { error: undefined, loading: false, loaded: false, [options.dataProp]: options.defaultData }

  return function (state = defaultState, { type, payload, meta }) {
    switch (type) {
      case actionCreator.TYPE:
        return options.shouldSpread ?
          {
            loading: true,
            loaded: state && state.loaded || false,
            ...(options.shouldDestroyDataOnError ? {} : {error: state.error}),
            ...(options.defaultData || {}),
          } :
          {
            loading: true,
            loaded: state && state.loaded || false,
            ...(options.shouldDestroyDataOnError ? {} : {error: state.error}),
            [options.dataProp]: options.shouldDestroyData ? options.defaultData : state[options.dataProp],
          }
      case actionCreator.success.TYPE: {
        if (!options.shouldSetData){
          return {loading: false, loaded: true}
        }
        const progress = state && state.progress === undefined ? {} : {progress: 0}
        const data = typeof(options.dataGetter) === 'function' ?
          options.dataGetter(state, {type, payload, meta}) : payload
        return options.shouldSpread ?
          {
              loading: false,
              loaded: true,
              ...progress,
              ...data,
              ...(options.saveAsyncFnArgs ? {asyncFnArgs: meta?._toolbeltAsyncFnArgs} : {}),
          } :
          {
            loading: false,
            loaded: true,
            ...progress, 
            [options.dataProp]: data,
            ...(options.saveAsyncFnArgs ? {asyncFnArgs: meta?._toolbeltAsyncFnArgs} : {}),
          }
      }
      case actionCreator.progress.TYPE:
        return {...state, progress: payload}
      case actionCreator.failure.TYPE:
        return {
          ...(options.shouldDestroyDataOnError ? {} : state),
          loading: false,
          error: options.shouldSetError ? payload : undefined,
        }
      default:
        return state
    }
  }
}

makeAsyncReducer.withDefaults = defaults => (actionCreator, options) => {
  options = Object.assign({}, defaults, options)
  return makeAsyncReducer(actionCreator, options)
}
