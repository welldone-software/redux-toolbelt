import makeActionCreator from 'redux-toolbelt.utils/lib/makeActionCreator'
import trivialArgsMapper from 'redux-toolbelt.internal/lib/trivialArgsMapper'

export const ACTION_ASYNC_REQUEST_SUFFIX = '@ASYNC_REQUEST'
export const ACTION_ASYNC_SUCCESS_SUFFIX = '@ASYNC_SUCCESS'
export const ACTION_ASYNC_FAILURE_SUFFIX = '@ASYNC_FAILURE'
export const ACTION_ASYNC_PROGRESS_SUFFIX = '@ASYNC_PROGRESS'
export const ACTION_ASYNC_CANCEL_SUFFIX = '@ASYNC_CANCEL'

export const ACTION_ASYNC_SUCCESS_METHOD = 'success'
export const ACTION_ASYNC_FAILURE_METHOD = 'failure'
export const ACTION_ASYNC_PROGRESS_METHOD = 'progress'
export const ACTION_ASYNC_CANCEL_METHOD = 'cancel'

/**
 *
 * @param baseName
 * @param argsMapper
 * @param options
 * @returns {function(*, *): {type: string, payload: *, meta: *}}
 */
export default function makeAsyncActionCreator(baseName, argsMapper = trivialArgsMapper, options) {

  const actionCreator = makeActionCreator(`${baseName}${ACTION_ASYNC_REQUEST_SUFFIX}`, argsMapper, options)

  actionCreator[ACTION_ASYNC_SUCCESS_METHOD] = makeActionCreator(`${baseName}${ACTION_ASYNC_SUCCESS_SUFFIX}`, trivialArgsMapper, options)
  actionCreator[ACTION_ASYNC_FAILURE_METHOD] = makeActionCreator(`${baseName}${ACTION_ASYNC_FAILURE_SUFFIX}`, trivialArgsMapper, options)
  actionCreator[ACTION_ASYNC_PROGRESS_METHOD] = makeActionCreator(`${baseName}${ACTION_ASYNC_PROGRESS_SUFFIX}`, trivialArgsMapper, options)
  actionCreator[ACTION_ASYNC_CANCEL_METHOD] = makeActionCreator(`${baseName}${ACTION_ASYNC_CANCEL_SUFFIX}`, trivialArgsMapper, options)

  return actionCreator
}

makeAsyncActionCreator.withDefaults = ({ prefix = '', defaultMeta }) => (baseName, argsMapper, options) => {
  options = Object.assign({}, { prefix, defaultMeta }, options)
  return makeAsyncActionCreator(baseName, argsMapper, options)
}
