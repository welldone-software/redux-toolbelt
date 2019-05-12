import { BaseAction } from './index.d';
import { ActionCreator } from "./makeActionCreator";

export declare function makeReducer<S = any, A extends BaseAction = BaseAction>(
  actionCreators: makeReducer.ActionCreators<A>,
  actionHandlerOrOptions?: makeReducer.ActionHandlerOrOptions | makeReducer.Options,
  options?: makeReducer.Options
): Reucer<S, A>;

export declare type Reucer<S = any, A = BaseAction> = (state: S, action: A) => S;

export declare namespace makeReducer {
  export type ActionCreators<A extends BaseAction> = ActionCreator<A>
    | ActionCreator<A>[]
    | { [name: string]: ActionCreator<A> };
  export type ActionHandlerOrOptions = () => void;
  export interface Options {
    defaultState: any
  }
}

export default makeReducer;
