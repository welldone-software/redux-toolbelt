import isFunction from 'lodash.isfunction'
import isPlainObject from 'lodash.isplainobject'
import transform from 'lodash.transform'
import { isActionCreator } from './utils'

const defaultOptions = {
  defaultState: null,
}

const defaultActionHandler = (state, action) => action.payload

/**
 * makeReducer - makes a reducer that handles action creator[s]
 *
 * @param {ActionCreator|ActionCreator[]|Object} actionCreators - action creator or an array of action creators or an object of action creators
 * @param {function(state,payload)|Object} [actionHandlerOrOptions] - function to be called when the specified actions are dispatched
 * @param {Object} [options] - specify reducer's options
 * @param {Object} [options.defaultState] - specify the initial (default) state
 */
// eslint-disable-next-line no-unused-vars
export default function makeReducer(actionCreators, actionHandlerOrOptions, options) {
  const actionsMap = getActionsMapFromArgs(arguments)
  const { defaultState } = getOptions(arguments)

  return (state = defaultState, action) => {
    const actionHandler = actionsMap[action.type]
    return actionHandler ? actionHandler(state, action) : state
  }
}

function getActionsMapFromArgs(args){
  if(Array.isArray(args[0])){
    const actionCreators = args[0]
    const actionsHandler = isFunction(args[1]) ? args[1] : defaultActionHandler

    return transform(actionCreators, (actions, actionCreator) => {
      actions[actionCreator.TYPE] = actionsHandler
    }, {} )
  }

  if(isPlainObject(args[0])){
    return args[0]
  }

  if(isActionCreator(args[0])){
    const actionCreator = args[0]
    const actionsHandler = isFunction(args[1]) ? args[1] : defaultActionHandler
    return { [actionCreator]: actionsHandler }
  }

  throw new Error('[redux-toolbelt] makeReducer received an unexpected input.')
}

function getOptions(args){
  if(args.length < 2){
    return { ...defaultOptions }
  }

  const lastArg = args[args.length - 1]
  return isPlainObject(lastArg) ?
    { ...defaultOptions, ...lastArg } :
    { ...defaultOptions }
}
