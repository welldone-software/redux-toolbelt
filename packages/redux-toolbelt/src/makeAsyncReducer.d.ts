import { AsyncActionCreator } from "./makeAsyncActionCreator";
import { Reducer } from 'redux';
import { Action } from ".";

export declare function makeAsyncReducer<S = any, A extends Action = Action>(
  actionCreator: AsyncActionCreator<A>,
  options?: makeAsyncReducer.Options<S,A>
): Reducer<S, A>;

export declare namespace makeAsyncReducer {
  export interface Options<S = any, A extends Action = Action> {
    dataProp: string;
    shouldDestroyData: boolean;
    shouldDestroyDataOnError: boolean;
    shouldSetError: boolean;
    defaultData: any;
    shouldSpread: boolean;
    shouldSetData: boolean;
    dataGetter: (state: S, action: A) => any;
  }
  export function withDefaults<S = any, A extends Action = Action>(
      defaults: makeAsyncReducer.Options<S,A>
    ): (
      actionCreator: AsyncActionCreator<A>,
      options?: makeAsyncReducer.Options<S,A>) => Reducer<S, A>
}
export default makeAsyncReducer;
