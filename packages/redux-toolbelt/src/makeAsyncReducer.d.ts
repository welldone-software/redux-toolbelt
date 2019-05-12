import { AsyncActionCreator } from "./makeAsyncActionCreator";
import { Reducer } from 'redux';
import { Action } from '.';

/**
 * Creates a reducer that handles action created with makeAsyncActionCreator()
 *
 * @template S The type of state consumed and produced by this reducer
 *
 * @template A The type of actions the reducer can potentially respond to.
 *
 * @param {AsyncActionCreator<A>} actionCreator An action creator made with makeAsyncActionCreator
 *
 * @param {makeAsyncReducer.Options<S,A>} [options] An object of options to define the
 *  behavior of the reducer
 *
 * @returns {Reducer<S, A>} A reducer function that builds a state object.
 */
export declare function makeAsyncReducer<S = any, A extends Action = Action>(
  actionCreator: AsyncActionCreator<A>,
  options?: makeAsyncReducer.Options<S,A>
): Reducer<S, A>;

export declare namespace makeAsyncReducer {
  export interface Options<S = any, A extends Action = Action> {
    dataProp: string;
    shouldDestroyData: boolean;
    shouldDestroyDataOnError: boolean;
    shouldSetError: boolean;
    defaultData: any;
    shouldSpread: boolean;
    shouldSetData: boolean;
    dataGetter: (state: S, action: A) => any;
  }

  export type makeAsyncReducerFactoryFN<S = any, A extends Action = Action> = (
    actionCreator: AsyncActionCreator<A>,
    options?: makeAsyncReducer.Options<S,A>
    ) => Reducer<S, A>

  /**
   * A factory function for creating a version of makeAsyncReducer
   * function with default options.
   *
   * @template S The type of state consumed and produced by this reducer
   *
   * @template A The type of actions the reducer can potentially respond to.
   *
   * @param {makeAsyncReducer.Options<S,A>} defaults An object of options to
   * define the behavior of the reducer
   *
   * @returns {makeAsyncReducerFactoryFN} A makeAsyncReducer function with predefined options
   */
  export function withDefaults<S = any, A extends Action = Action>(
      defaults: makeAsyncReducer.Options<S,A>
    ): makeAsyncReducerFactoryFN
}
export default makeAsyncReducer;
