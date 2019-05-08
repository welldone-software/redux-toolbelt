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

export * from './makeActionCreator';

