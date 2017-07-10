import isFunction from 'lodash.isfunction'

/**
 *
 * @param reducers type Reducer = (state: Object, action: {type: stirngx}, ...rest) => any | {[key: string]: Reducer};
 * @returns {function(*=, ...[*]): *}
 */
export default function composeReducers(...reducers) {
    return (state, ...rest) =>
        reducers.reduce(
            (newState, reducer) => exec(reducer, newState, ...rest),
            state)
}

function exec(reducerOrReducersMap, state, ...args) {
  return isFunction(reducerOrReducersMap) ?
    reducerOrReducersMap(state, ...args) :
    execReducerMap(reducerOrReducersMap, state, ...args)
}

function execReducerMap(reducersMap, state, ...args) {
  if (state === null || state === undefined) {
    return state
  }
  return Object.keys(reducersMap).reduce(
    (newState, key) =>
      execReducerMapItem(key, reducersMap[key], newState, ...args),
    state)
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
