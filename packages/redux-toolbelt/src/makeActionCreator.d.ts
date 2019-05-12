import { Action, GenericAction } from './index';

export declare type ActionCreator<A extends Action> = (
  (payload?: any, meta?: any) => GenericAction<A["payload"], A["meta"]>
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
export declare function makeActionCreator<A extends Action>(
  name: string,
  /**
   * A mapper function that enables us to shape the payload and/or the meta
   */
  argsMapper?: makeActionCreator.ArgsMapperFN<A>,
  options?: any
): ActionCreator<A>;

export declare namespace makeActionCreator {
  export type ArgsMapperFN<A extends Action> = (...arg: any) => { payload?: A["payload"], meta?: A["meta"], [name: string]: any }

  export interface DefaultsArg {
    prefix?: string;
    defaultMeta?: any;
  }

  export interface Options<A extends Action> {
    argsMapper?: ArgsMapperFN<A>;
    defaultMeta: A['meta'];
  }

  /**
   * Create an action creator with default prefix or metadata
   */
  export function withDefaults<A extends Action>(args: DefaultsArg): (
    name: string,
    /**
     * A mapper function that enables us to shape the payload and/or the meta
     */
    argsMapper?: (arg?: any) => { payload?: A["payload"], meta?: A["meta"], [name: string]: any },
    options?: Options<A>
  ) => ActionCreator<A>;
}
export default makeActionCreator;
