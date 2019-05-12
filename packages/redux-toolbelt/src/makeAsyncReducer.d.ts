import { AsyncActionCreator } from "./makeAsyncActionCreator";
import { BaseAction } from ".";
import { Reucer } from "./makeReducer";

export declare function makeAsyncReducer<S = any, A extends BaseAction = BaseAction>(
  actionCreator: AsyncActionCreator<A>,
  options?: makeAsyncReducer.Options<S,A>
): Reucer<S, A>;

export declare namespace makeAsyncReducer {
  export interface Options<S = any, A extends BaseAction = BaseAction> {
    dataProp: string;
    shouldDestroyData: boolean;
    shouldDestroyDataOnError: boolean;
    shouldSetError: boolean;
    defaultData: any;
    shouldSpread: boolean;
    shouldSetData: boolean;
    dataGetter: (state: S, action: A) => any;
  }
  export function withDefaults<S = any, A extends BaseAction = BaseAction>(
      defaults: makeAsyncReducer.Options<S,A>
    ): (
      actionCreator: AsyncActionCreator<A>,
      options?: makeAsyncReducer.Options<S,A>) => Reucer<S, A>
}
export default makeAsyncReducer;
