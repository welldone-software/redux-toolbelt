import isFunction from 'lodash.isfunction'
import isPlainObject from 'lodash.isplainobject'

const defaultOptions = {
  defaultState: null,
}

const defaultFunc = (state, action) => action.payload

/**
 * makeReducer - makes a trivial reducer that returns the payload as the state
 *
 * @param {ActionCreator} actionCreator - an action creator created with makeActionCreator (or part of a makeAsyncActionCreator)
 * @param {function(state,payload)|Object} [funcOrOptions] - function to be called when reducer's action is dispatched
 * @param {Object} [options] - specify reducer's options
 * @param [options.defaultState] - specify the initial (default) state
 */
export default function makeReducer(actionCreator, funcOrOptions, options) {
  const func = isFunction(funcOrOptions) ? funcOrOptions : defaultFunc

  options = isPlainObject(funcOrOptions) ? funcOrOptions : options

  options = options ? {
    ...defaultOptions,
    ...options,
  } : defaultOptions

  const {defaultState} = options

  return function (state = defaultState, action) {
    if (action.type === actionCreator.TYPE) {
      return func(state, action)
    }
    return state
  }
}
