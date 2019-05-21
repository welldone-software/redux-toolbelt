import makeActionCreator, { ActionCreator } from './makeActionCreator';
import { Action } from '.';

export declare const ACTION_ASYNC_REQUEST_SUFFIX: string;
export declare const ACTION_ASYNC_SUCCESS_SUFFIX: string;
export declare const ACTION_ASYNC_FAILURE_SUFFIX: string;
export declare const ACTION_ASYNC_PROGRESS_SUFFIX: string;
export declare const ACTION_ASYNC_CANCEL_SUFFIX: string;

export declare const ACTION_ASYNC_SUCCESS_METHOD: string;
export declare const ACTION_ASYNC_FAILURE_METHOD: string;
export declare const ACTION_ASYNC_PROGRESS_METHOD: string;
export declare const ACTION_ASYNC_CANCEL_METHOD: string;

export type AsyncActionCreator<A extends Action> = ActionCreator<A> & AsyncActionCreatorProps<A>

export interface AsyncActionCreatorProps<A extends Action> {
  success: ActionCreator<A>;
  failure: ActionCreator<A>;
  progress: ActionCreator<A>;
  cancel: ActionCreator<A>;
}

/**
 * Wrapper around makeActionCreator(), to help create multiple actions
 * creators for usage in async/side effects middlewares like
 * redux-thunk, redux-saga or redux-observable.
 *
 * @template A The type of action the function can responde to
 *
 * @param {string} name The type name of the action
 *
 * @param {makeActionCreator.ArgsMapperFN<A>} [argsMapper] Arguments mapper function
 *
 * @param {makeActionCreator.Options<A>} [options] Optional data to pass to action creator
 *
 * @returns {AsyncActionCreator<A>} Async action creator
 */
export declare function makeAsyncActionCreator<A extends Action>(
  name: string,
  /**
   * A mapper function that enables us to shape the payload and/or the meta
   */
  argsMapper?: makeActionCreator.ArgsMapperFN<A>,
  /**
   * Options to pass to action creator
   * - argsMapper - Arguments mapper function
   * - defaultMeta - Default metadata for the action
   */
  options?: makeActionCreator.Options<A>
): AsyncActionCreator<A>;

export declare namespace makeAsyncActionCreator {
  /**
   * Create an action creator with default prefix or metadata
   */
  export declare function withDefaults<A extends Action>(args: makeActionCreator.DefaultsArg): (
    name: string,
    /**
     * A mapper function that enables us to shape the payload and/or the meta
     */
    argsMapper?: (arg?: any) => { payload?: A['payload'], meta?: A['meta'], [name: string]: any },
    /**
     * Options to pass to action creator
     * - argsMapper - Arguments mapper function
     * - defaultMeta - Default metadata for the action
     */
    options?: any
  ) => AsyncActionCreator<A>;
}

export default makeAsyncActionCreator;
