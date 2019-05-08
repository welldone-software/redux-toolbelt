import { BaseAction } from './index';

declare type ActionCreator<T extends BaseAction> = ((payload?: T["payload"], meta?: T["meta"]) => T) & ActionCreatorProps;

declare interface ActionCreatorProps {
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
declare function makeActionCreator<T extends BaseAction>(
  name: string,
  /**
   * A mapper function that enables us to shape the payload and/or the meta
   */
  argsMapper?: (arg?: any) => { payload?: T["payload"], meta?: T["meta"], [name: string]: any },
  options?: any
): ActionCreator<T>;

declare namespace makeActionCreator {
  export interface ArgsMapperBody {
    payload?: any;
    meta?: any;
    [name: string]: any;
  }
  export type argsMapperFn = (arg?: any) => ArgsMapperBody;

  interface DefaultsArg {
    prefix?: string;
    defaultMeta?: any;
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
    options?: any
  ) => ActionCreator<T>;
}
export default makeActionCreator
