import makeActionCreator from './makeActionCreator'
import trivialArgsMapper from './_trivialArgsMapper'
import { getOptions } from './utils'

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
 * @typedef {ActionCreator} AsyncActionCreator
 * @property {string} TYPE - action type
 * @property {ActionCreator} success - an action that indicates the async method had succeed
 * @property {ActionCreator} failure - an action that indicates the async method has failed
 * @property {ActionCreator} progress - an action that indicates a progress in the async method has been made
 * @property {ActionCreator} cancel - an action that indicates the async method has been canceled
 *
 * @param baseName
 * @param [argsMapper]
 * @param [options]
 * @returns {AsyncActionCreator}
 */
export default function makeAsyncActionCreator(baseName, argsMapper, options) {
  options = getOptions({ argsMapper, options })

  const actionCreator = makeActionCreator(`${baseName}${ACTION_ASYNC_REQUEST_SUFFIX}`, options)

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
