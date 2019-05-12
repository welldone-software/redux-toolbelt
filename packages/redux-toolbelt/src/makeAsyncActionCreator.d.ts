import makeActionCreator, { ActionCreator } from './makeActionCreator';
import { AnyAction } from 'redux';

export declare type AsyncActionCreator<A extends AnyAction> = ActionCreator<A> & AsyncActionCreatorProps<A>

export declare interface AsyncActionCreatorProps<A extends AnyAction> {
  success: ActionCreator<A>;
  failure: ActionCreator<A>;
  progress: ActionCreator<A>;
  cancel: ActionCreator<A>;
}

export declare function makeAsyncActionCreator<A extends AnyAction>(
  name: string,
  /**
   * A mapper function that enables us to shape the payload and/or the meta
   */
  argsMapper?: makeActionCreator.ArgsMapperFN<A>,
  options?: makeActionCreator.Options<A>
): AsyncActionCreator<A>;

export declare namespace makeAsyncActionCreator {
  /**
   * Create an action creator with default prefix or metadata
   */
  export function withDefaults<A extends AnyAction>(args: makeActionCreator.DefaultsArg): (
    name: string,
    /**
     * A mapper function that enables us to shape the payload and/or the meta
     */
    argsMapper?: (arg?: any) => { payload?: A["payload"], meta?: A["meta"], [name: string]: any },
    options?: any
  ) => AsyncActionCreator<A>;
}

export default makeAsyncActionCreator;
