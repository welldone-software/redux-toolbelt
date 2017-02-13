export const ACTION_PREFIX = process.env.ACTION_PREFIX || ''
export const ACTION_ASYNC_REQUEST_SUFFIX = process.env.ACTION_ASYNC_REQUEST_SUFFIX || '@ASYNC_REQUEST'
export const ACTION_ASYNC_SUCCESS_SUFFIX = process.env.ACTION_ASYNC_SUCCESS_SUFFIX || '@ASYNC_SUCCESS'
export const ACTION_ASYNC_FAILURE_SUFFIX = process.env.ACTION_ASYNC_FAILURE_SUFFIX || '@ASYNC_FAILURE'

/**
 *
 * @param name
 * @param options
 * @returns {function(*, *): {type: string, payload: *, meta: *}}
 */
export function makeActionCreator(name, options) {

  const defaults = {defaultMeta: undefined, prefix: ACTION_PREFIX}
  options = Object.assign(defaults, options)

  const type = `${options.prefix}${name}`
  const actionCreator = (payload, meta) => ({
    type,
    payload,
    meta: options.defaultMeta? Object.assign({}, options.defaultMeta, meta) : meta,
  })
  actionCreator.TYPE = type
  return actionCreator

}

/**
 *
 * @param baseName
 * @param options
 * @returns {function(*, *): {type: string, payload: *, meta: *}}
 */
export function makeAsyncActionCreator(baseName, options) {

  const actionCreator = makeActionCreator(`${baseName}${ACTION_ASYNC_REQUEST_SUFFIX}`, options)
  actionCreator.success = makeActionCreator(`${baseName}${ACTION_ASYNC_SUCCESS_SUFFIX}`, options)
  actionCreator.failure = makeActionCreator(`${baseName}${ACTION_ASYNC_FAILURE_SUFFIX}`, options)

  return actionCreator
}

/**
 *
 * @param actionCreator
 * @param options = {dataProp , shouldDestroyData, defaultData, shouldSpread})
 * @returns {Function}
 */
export function makeAsyncReducer(actionCreator, options) {
  const defaults = {dataProp: 'data', shouldDestroyData: true, defaultData: undefined, shouldSpread: false}
  options = Object.assign(defaults, options)

  const defaultState = options.shouldSpread ?
    {error: undefined, loading: false, ...(options.defaultData || {})} :
    {error: undefined, loading: false, [options.dataProp]: options.defaultData}

  return function (state = defaultState, {type, payload}) {
    switch (type) {
      case actionCreator.TYPE:
        return options.shouldSpread ?
          {loading: true, ...(options.destoryData && options.defaultData || {})} :
          {loading: true, [options.dataProp]: options.shouldDestroyData ? options.defaultData : state.data}
      case actionCreator.success.TYPE:
        return options.shouldSpread ?
          {loading: false, ...payload} :
          {loading: false, [options.dataProp]: payload}
      case actionCreator.failure.TYPE:
        return {loading: false, error: payload}
      default:
        return state
    }
  }
}
