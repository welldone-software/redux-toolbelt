import { Observable } from 'rxjs';
import { Action } from 'redux-toolbelt';
import { Epic } from 'redux-observable';

/**
 * Reacts to actions by suffix, and dispaches another action
 *
 * @template I The type of actions that will be passed to the epic
 *
 * @template O The type of actions the epic will return
 *
 * @template S The type of state to expect
 *
 * @param {makeSuffixesEpic.mapper<I,O,S>} mapper
 * A mapper function that returns an action. The function takes 3 parameters:
 * - action - The current action the epic handles
 * - state$ - An observable containing the current state
 * - dependencies - Optional additional dependencies
 *
 * @param {string[] | string} suffixes
 * An array of prefixes or a single prefix
 *
 * @param {(meta:I['meta']) => boolean} metaPredicate
 * Another filtering option for the incoming actions on the stream, allows to
 * filter by content of action meta field
 *
 * @returns {Epic<I,O,S>} An Epic
 */
export declare function makeSuffixesEpic<I extends Action, O extends I, S = any>(
  mapper: makeSuffixesEpic.mapper<I, O, S>,
  suffixes: string[] | string,
  metaPredicate: (meta: I['meta']) => boolean
): Epic<I, O, S>

export declare namespace makeSuffixesEpic {
  export type mapper<I extends Action, O extends Action, S = any> = (
    action: I,
    state$: Observable<S>,
    dependencies?: any
  ) => O
}
