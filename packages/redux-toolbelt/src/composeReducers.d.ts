import { Reducer } from 'redux';
import { Action } from '.';

/**
 * This function is a replacement for redux's combineReducers.
 * The function excepts multiple reducers as arguments and executes them one after the other.
 *
 * @template S The type of state consumed and produced by this reducer
 *
 * @template A The type of actions the reducer can potentially respond to.
 *
 * @param {(Reducer<S, A>[] | {[name: string]: Reducer<S, A>}[])} reducers
 * Any number of reducers, or redcuer maps
 *
 * @returns {Reducer<S, A>} A reducer function that builds a state object.
 */
export declare function composeReducers<S = any, A extends Action = Action>(
  ...reducers: composeReducers.reducerOrMap[]
): Reducer<S, A>;

export declare namespace composeReducers {
  export type reducerOrMap<S = any, A extends Action = Action> = Reducer<S, A> | {[name: string]: Reducer<S, A>};
}
