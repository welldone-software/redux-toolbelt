import makeActionCreator, { ActionCreator } from './makeActionCreator';
import { BaseAction } from '.';

export declare type AsyncActionCreator<A extends BaseAction> = ActionCreator<A> & AsyncActionCreatorProps<A>

export declare interface AsyncActionCreatorProps<A extends BaseAction> {
  success: ActionCreator<A>;
  failure: ActionCreator<A>;
  progress: ActionCreator<A>;
  cancel: ActionCreator<A>;
}

export declare function makeAsyncActionCreator<A extends BaseAction>(
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
  export function withDefaults<A extends BaseAction>(args: makeActionCreator.DefaultsArg): (
    name: string,
    /**
     * A mapper function that enables us to shape the payload and/or the meta
     */
    argsMapper?: (arg?: any) => { payload?: A["payload"], meta?: A["meta"], [name: string]: any },
    options?: any
  ) => AsyncActionCreator<A>;
}

export default makeAsyncActionCreator;
