/**
 * makeReducer - makes a trivial reducer that returns the payload as the state
 *
 * @param {TYPE} actionCreator - an action creator created with makeActionCreator (or part of a makeAsyncActionCreator)
 * @param {defaultState} options - options, allowing to speicify the initial (default) state
 */
export default function makeReducer(actionCreator, { defaultState } = {}) {
  return function (state = defaultState, { type, payload }) {
    if (type === actionCreator.TYPE) {
      return payload
    }
    return state
  }
}
