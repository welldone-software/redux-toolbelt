import { Reducer } from 'redux';
import { ActionCreator } from "./makeActionCreator";
import { Action } from '.';

/**
 * Creates a reducer that handles action creator[s] created with makeActionCreator
 *
 * @template S The type of state consumed and produced by this reducer
 *
 * @template A The type of actions the reducer can potentially respond to.
 *
 * @param {makeReducer.ActionCreators<A>} actionCreators Can accept a single action creator,
 *  an array of action creators or an object of action creators created with makeActionCreator
 *
 * @param {(makeReducer.ActionHandlerOrOptions | makeReducer.Options)} [actionHandlerOrOptions]
 *  An action creator function or an optional default state
 *
 * @param {makeReducer.Options} [options] Can accept an optional default state
 *
 * @returns {Reducer<S, A>} A reducer function that builds a state object.
 */
export declare function makeReducer<S = any, A extends Action = Action>(
  actionCreators: makeReducer.ActionCreators<A>,
  actionHandlerOrOptions?: makeReducer.ActionHandler<S, A> | makeReducer.Options,
  options?: makeReducer.Options
): Reducer<S, A>;

export declare namespace makeReducer {
  export type ActionCreators<A extends Action> = ActionCreator<A>
    | ActionCreator<A>[]
    | { [name: string]: ActionCreator<A> };
  export type ActionHandler<S,A> = (state:S, action:A) => any;
  export interface Options {
    defaultState: any
  }
}

export default makeReducer;
