import { BaseAction, GenericAction } from './index';

export declare type ActionCreator<T extends BaseAction> = (
  (payload?: any, meta?: any) => GenericAction<T["payload"],T["meta"]>
  ) & ActionCreatorProps;

export declare interface ActionCreatorProps {
  /**
   * Exposes TYPE as static member.
   */
  Type: string;
  toString: () => string;
}

/**
 * Create a redux action creator
 * @param name - The name of the Action
 * @param argsMapper - Arguments mapper function
 * @param options -
 */
export declare function makeActionCreator<T extends BaseAction>(
  name: string,
  /**
   * A mapper function that enables us to shape the payload and/or the meta
   */
  argsMapper?: makeActionCreator.ArgsMapperFN<T>,
  options?: any
): ActionCreator<T>;



export declare namespace makeActionCreator {
  export type ArgsMapperFN<T extends BaseAction> = (...arg: any) => { payload?: T["payload"], meta?: T["meta"], [name: string]: any }

  export interface DefaultsArg {
    prefix?: string;
    defaultMeta?: any;
  }

  export interface Options<T extends BaseAction>{
    argsMapper?:ArgsMapperFN<T>;
    defaultMeta: T["meta"];
  }

  /**
   * Create an action creator with default prefix or metadata
   */
  export function withDefaults<T extends BaseAction>(args: DefaultsArg): (
    name: string,
    /**
     * A mapper function that enables us to shape the payload and/or the meta
     */
    argsMapper?: (arg?: any) => { payload?: T["payload"], meta?: T["meta"], [name: string]: any },
    options?: Options<T>
  ) => ActionCreator<T>;
}
export default makeActionCreator;
