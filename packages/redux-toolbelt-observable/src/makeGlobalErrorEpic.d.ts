import {makeSuffixesEpic} from "./makeSuffixesEpic";
import { Action } from "redux-toolbelt";
import { Epic } from "redux-observable";

/**
 * Creates an epic that handles failure actions created by calls to makeAsyncActionCreator.
 * The helper epic listens to the all failure actions dispatched in the application
 * and allows you to handler them centrally, in one place
 *
 * @template I The type of actions that will be passed to the epic
 *
 * @template O The type of actions the epic will return
 *
 * @template S The type of state to expect
 *
 * @param {makeSuffixesEpic.mapper<I, O, S>} mapper
 * A mapper function that returns an action. The function takes 3 parameters:
 * - action - The current action the epic handles
 * - state$ - An observable containing the current state
 * - dependencies - Optional additional dependencies
 *
 * @param {(string[] | string)} suffixes
 * An array of prefixes or a single prefix
 *
 * @param {string} [metaprops] Meta property that the epic should skip if set to true
 *
 * @returns {Epic<I, O, S>} An Epic
 */
export declare function makeGlobalErrorEpic<I extends Action, O extends I, S = any>(
  mapper: makeSuffixesEpic.mapper<I, O, S>,
  suffixes: string[] | string,
  metaprops?: string
):Epic<I, O, S>;
