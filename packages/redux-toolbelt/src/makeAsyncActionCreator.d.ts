import makeActionCreator from './makeActionCreator';
import { BaseAction, ActionCreator } from '.';

export declare type AsyncActionCreator<T extends BaseAction> = ActionCreator<T> & AsyncActionCreatorProps<T>

export declare interface AsyncActionCreatorProps<T extends BaseAction> {
  success: ActionCreator<T>;
  failure: ActionCreator<T>;
  progress: ActionCreator<T>;
  cancel: ActionCreator<T>;
}


export declare function makeAsyncActionCreator<T extends BaseAction>(
  name: string,
  /**
   * A mapper function that enables us to shape the payload and/or the meta
   */
  argsMapper?: makeActionCreator.ArgsMapperFN<T>,
  options?: makeActionCreator.Options<T>
): AsyncActionCreator<T>;

export declare namespace makeAsyncActionCreator {
  /**
   * Create an action creator with default prefix or metadata
   */
  export function withDefaults<T extends BaseAction>(args: makeActionCreator.DefaultsArg): (
    name: string,
    /**
     * A mapper function that enables us to shape the payload and/or the meta
     */
    argsMapper?: (arg?: any) => { payload?: T["payload"], meta?: T["meta"], [name: string]: any },
    options?: any
  ) => AsyncActionCreator<T>;
}

export default makeAsyncActionCreator;
