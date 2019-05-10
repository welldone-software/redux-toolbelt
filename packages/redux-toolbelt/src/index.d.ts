// Type definitions for redux-toolbelt v2.2.2
// Project: https://github.com/welldone-software/redux-toolbelt
// Definitions by: Idan Baraness <https://github.com/ibaraness/>

/**
 * Basic FSA (Flux Standard Action)
 *
 * @export
 * @interface BaseAction
 */
export interface BaseAction {
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
export interface GenericAction<Payload, Meta> extends BaseAction{
  payload?: Payload;
  meta?: Meta;
}
//import makeActionCreator from './makeActionCreator'
export * from './makeActionCreator';

