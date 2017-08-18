/**
 *
 * @param actionCreator
 * @param options = {dataProp , shouldDestroyData, defaultData, shouldSpread})
 * @returns {Function}
 */
export default function makeAsyncReducer(actionCreator, options) {
  const defaults = { dataProp: 'data', shouldDestroyData: true, defaultData: undefined, shouldSpread: false, shouldSetData: true }
  options = Object.assign(defaults, options)

  const defaultState = options.shouldSpread ?
    { error: undefined, loading: false, ...(options.defaultData || {}) } :
    { error: undefined, loading: false, [options.dataProp]: options.defaultData }

  return function (state = defaultState, { type, payload }) {
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
        return options.shouldSpread ?
          {loading: false, ...progress, ...payload} :
          {loading: false, ...progress, [options.dataProp]: payload}
      }
      case actionCreator.progress.TYPE:
        return {...state, progress: payload}
      case actionCreator.failure.TYPE:
        return { loading: false, error: payload }
      default:
        return state
    }
  }
}

makeAsyncReducer.withDefaults = defaults => (actionCreator, options) => {
  options = Object.assign({}, defaults, options)
  return makeAsyncReducer(actionCreator, options)
}
