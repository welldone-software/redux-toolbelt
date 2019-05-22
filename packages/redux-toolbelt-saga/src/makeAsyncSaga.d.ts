import { AsyncActionCreator, Action } from "redux-toolbelt";

/**
 * Creates a saga that handles actions created using makeAsyncActionCreator
 *
 * @template A The type of actions that will be passed to the function
 *
 * @template P The type of result to expect from the promise
 *
 * @param {AsyncActionCreator<A>} asyncActionCreator
 * Async
 *
 * @param {(...args:any) => Promise} fn
 * A function that returns a promise
 *
 * @param {makeAsyncSaga.Options<A>} options
 * There are currenctly two options:
 * - mapArgs Mapper function for the `fn` function
 * - args Custom argument to pass for the `fn` function
 *
 * @returns {Iterator<S>} A Saga
 */
export declare function makeAsyncSaga<A extends Action = Action, P = any>(
  asyncActionCreator: AsyncActionCreator<A>,
  fn: (...args:any) => Promise<P>,
  options?: makeAsyncSaga.Options<A>
): Iterator<A>;

export declare namespace makeAsyncSaga {
  export interface Options<A> {
    mapArgs: (action:A) => any,
    args: any
  }
}
export default makeAsyncSaga;
