import isFunction from 'lodash.isfunction'
import isPlainObject from 'lodash.isplainobject'

const defaultOptions = {
  defaultState: null,
}

const defaultFunc = (state, action) => action.payload

/**
 * makeReducer - makes a trivial reducer that returns the payload as the state
 *
 * @param {ActionCreator|ActionCreator[]} actionCreators - aa action creator or an array of created with
 *                                        makeActionCreator (or part of a makeAsyncActionCreator)
 * @param {function(state,payload)|Object} [funcOrOptions] - function to be called when reducer's action is dispatched
 * @param {Object} [options] - specify reducer's options
 * @param [options.defaultState] - specify the initial (default) state
 */
export default function makeReducer(actionCreators, funcOrOptions, options) {
  const func = isFunction(funcOrOptions) ? funcOrOptions : defaultFunc

  options = isPlainObject(funcOrOptions) ? funcOrOptions : options

  options = options ? {
    ...defaultOptions,
    ...options,
  } : defaultOptions

  const {defaultState} = options

  const types = (Array.isArray(actionCreators) ? actionCreators : [actionCreators]).map(({TYPE}) => TYPE)

  return function (state = defaultState, action) {
    if (types.indexOf(action.type) > -1) {
      return func(state, action)
    }
    return state
  }
}
