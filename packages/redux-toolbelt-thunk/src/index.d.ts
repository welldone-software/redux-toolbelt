// Type definitions for redux-toolbelt-thunk v2.1.2
// Project: https://github.com/welldone-software/redux-toolbelt
// Definitions by: Idan Baraness <https://github.com/ibaraness/>
import { Action as BaseAction } from 'redux';
/**
 * Basic FSA (Flux Standard Action)
 *
 * @export
 * @interface BaseAction
 */
export interface Action extends BaseAction {
  type: string;
  payload?: any;
  meta?: any;
}

/**
 * Redux action with generic payload and metadata
 *
 * @export
 * @interface GenericAction
 * @extends {BaseAction}
 * @template Payload
 * @template Meta
 */
export interface GenericAction<Payload, Meta> extends BaseAction {
  payload?: Payload;
  meta?: Meta;
}
export { default as makeThunkAsyncActionCreator } from './makeThunkAsyncActionCreator';
