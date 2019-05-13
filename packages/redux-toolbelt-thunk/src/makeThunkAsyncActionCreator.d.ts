import { Action, GenericAction } from ".";

/**
 * makeAsyncActionCreator can be very useful to create an action creator
 * that uses promises and reports its progress to the Redux state
 *
 * @template A The type of action the function can responde to
 *
 * @param {string} baseName The name of the Action
 *
 * @param {(...args: any) => Promise<any> | any} asyncFn
 * The function to execute when the action is called.
 * It should return a Promise. When it resolves, it will trigger
 * the success sub-action and if it rejects it will trigger the failure action
 *
 * @param {makeThunkAsyncActionCreator.ArgsMapperFN<A>} argsMapper
 * Maps the arguments that are passed to the action to the payload
 * that will be used on the action dispatched when action is called
 * and the meta that will be used when both the action and it's sub-actions are called
 *
 * @param {makeThunkAsyncActionCreator.Options<A>} options
 * Optional data to pass to the function
 * - prefix - Defaults to ''
 * - defaultMeta - Defaults to undefined
 * @returns {ThunkAsyncActionCreator<A>}
 */
export declare function makeThunkAsyncActionCreator<A extends Action, P = any>(
  baseName: string,
  asyncFn: (...args: any) => Promise<P> | P,
  argsMapper: makeThunkAsyncActionCreator.ArgsMapperFN<A>,
  options: makeThunkAsyncActionCreator.Options<A>
): ThunkAsyncActionCreator<A>

export declare interface ActionCreatorProps {
  /**
   * Exposes TYPE as static member.
   */
  Type: string;
  toString: () => string;
}

export declare type ActionCreator<A extends Action> = (
  (payload?: any, meta?: any) => GenericAction<A['payload'], A['meta']>
) & ActionCreatorProps;

export declare type ThunkAsyncActionCreator<A extends Action> = ActionCreator<A> & ThunkAsyncActionCreatorProps<A>

export declare interface ThunkAsyncActionCreatorProps<A extends Action> {
  success: ActionCreator<A>;
  failure: ActionCreator<A>;
  progress: ActionCreator<A>;
  cancel: ActionCreator<A>;
}

export declare namespace makeThunkAsyncActionCreator {
  export interface Options<A extends Action> {
    prefix?: string;
    defaultMeta?: A['meta'];
  }
  export type ArgsMapperFN<A extends Action> = (...arg: any) => {
    payload?: A['payload'],
    meta?: A['meta'], [name: string]: any
  }

  /**
   * Creates an instance of makeThunkAsyncActionCreator with the specified options
   *
   * @template A The type of action the function can responde to
   *
   * @template P The type of data the promise will return
   *
   * @param {DefaultsArg} args
   * Prefefined data to pass to the function
   * - prefix - Defaults to ''
   * - defaultMeta - Defaults to undefined
   * - argsMapper - Maps the arguments that are passed to the action to the payload
   * @returns
   * an instance of makeThunkAsyncActionCreator with the specified options
   */
  export function withDefaults<A extends Action, P = any>(args: DefaultsArg): (
    baseName: string,
    asyncFn: (...args: any) => Promise<P> | P,
    options: Options<A>
  ) => ThunkAsyncActionCreator<A>;
}

export default makeThunkAsyncActionCreator;
