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
  }
  options = Object.assign(defaults, options)

  const defaultState = options.shouldSpread ?
    { error: undefined, loading: false, ...(options.defaultData || {}) } :
    { error: undefined, loading: false, [options.dataProp]: options.defaultData }

  return function (state = defaultState, { type, payload, meta }) {
    switch (type) {
      case actionCreator.TYPE:
        return options.shouldSpread ?
          { loading: true, ...(options.defaultData || {}) } :
          { loading: true, [options.dataProp]: options.shouldDestroyData ? options.defaultData : state[options.dataProp] }
      case actionCreator.success.TYPE: {
        if (!options.shouldSetData){
          return {loading: false}
        }
        const progress = state && state.progress === undefined ? {} : {progress: 0}
        const data = typeof(options.dataGetter) === 'function' ?
          options.dataGetter(state, {type, payload, meta}) : payload
        return options.shouldSpread ?
          {loading: false, ...progress, ...data} :
          {loading: false, ...progress, [options.dataProp]: data}
      }
      case actionCreator.progress.TYPE:
        return {...state, progress: payload}
      case actionCreator.failure.TYPE:  
        return { 
          ...(options.shouldDestroyDataOnError ? {} : state), 
          loading: false, 
          error: options.shouldSetError ? payload : undefined 
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
