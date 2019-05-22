import { Epic } from "redux-observable";
import { AsyncActionCreator, Action } from "redux-toolbelt";
import { Observable } from "rxjs";

/**
 * Creates an epic that handles actions created makeAsyncActionCreator.
 * The epic listens to the request action and dispatches success and failure actions.
 *
 * @template A The type of actions the function can potentially respond to
 *
 * @template S The type of state this function might use
 *
 * @template P The type of data the promise might return
 *
 * @param {AsyncActionCreator<A>} actionCreator
 * An action creator made with makeAsyncActionCreator
 *
 * @param {makeAsyncEpic.AsyncFn<A, S, P>} asyncFn
 * An async function that can get 4 paramters and returns a promise
 * `(payload, type, meta, state$) => promise`
 * - payload. The action payload
 * - type. The action type
 * - meta. The action meta
 * - state$. An observable containing the current state
 *
 * @param {makeAsyncEpic.Options} [options]
 * An object with options:
 * - `cancelPreviousFunctionCalls`. If several requests are made before any
 * of them returns, you can choose to only receive the last one by passing true to
 * this option.
 *
 * @returns {Epic<A,A,S>} Async Epic
 */
export declare function makeAsyncEpic<A extends Action = Action, S = any, P = any>(
  actionCreator: AsyncActionCreator<A>,
  asyncFn: makeAsyncEpic.AsyncFn<A, S, P>,
  options?: makeAsyncEpic.Options
): Epic<A, A, S>

export namespace makeAsyncEpic {
  export interface Options {
    cancelPreviousFunctionCalls?: boolean;
  }

  export type AsyncFn<A extends Action = Action, S = any, P = any> = (
    payload?: A['payload'],
    type?: A['type'],
    meta?: A['meta'],
    state$?: Observable<S>
  ) => Promise<P>
}

export default makeAsyncEpic;
