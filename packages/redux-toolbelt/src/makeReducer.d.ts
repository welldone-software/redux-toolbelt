import { Reducer } from 'redux';
import { ActionCreator } from "./makeActionCreator";
import { Action } from '.';

export declare function makeReducer<S = any, A extends Action = Action>(
  actionCreators: makeReducer.ActionCreators<A>,
  actionHandlerOrOptions?: makeReducer.ActionHandlerOrOptions | makeReducer.Options,
  options?: makeReducer.Options
): Reducer<S, A>;

export declare namespace makeReducer {
  export type ActionCreators<A extends Action> = ActionCreator<A>
    | ActionCreator<A>[]
    | { [name: string]: ActionCreator<A> };
  export type ActionHandlerOrOptions = () => void;
  export interface Options {
    defaultState: any
  }
}

export default makeReducer;
