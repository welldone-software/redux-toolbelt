import {isFunction} from 'lodash'

const initialState = {}

/**
 * @param reducers type Reducer = (state: Object, action: {type: string}, ...rest) => any | {[key: string]: Reducer};
 * @returns {function(*=, ...[*]): *}
 */
export default function composeReducers(...reducers) {
  return (state, ...rest) => reducers.reduce(
    (newState, reducer) => exec(reducer, newState, ...rest),
    state
  )
}


function exec(reducerOrReducersMap, state, ...args) {
  return isFunction(reducerOrReducersMap) ?
    reducerOrReducersMap(state, ...args) :
    execReducerMap(reducerOrReducersMap, state, ...args)
}

function execReducerMap(reducersMap, state, ...args) {
  return Object.keys(reducersMap).reduce(
    (newState, key) => execReducerMapItem(key, reducersMap[key], newState, ...args),
    state || initialState
  )
}

function execReducerMapItem(key, reducer, state, ...args) {
  const oldChildState = state[key]
  const newChildState = exec(reducer, oldChildState, ...args)
  if (oldChildState === newChildState) {
    return state
  }

  return {
    ...state,
    [key]: newChildState,
  }
}
