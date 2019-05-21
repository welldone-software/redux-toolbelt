import { PlainObject } from ".";

/**
 * Updates items in an array that match the specified criteria
 *
 * @template T An optional specific type
 *
 * @param {T[]} arr An array of specific type T
 *
 * @param {(item:T) => boolean} filter
 * A filter function that returns boolean
 *
 * @param {(((item:T)=>T)|T)} newProps
 * The new properties to update the item with, or a mapper function for te properties
 *
 * @returns {T[]} A new array
 */
export declare function updateItemsByFilter<T extends PlainObject = {}>(
  arr: T[],
  filter: (item:T) => boolean,
  newProps: ((item:T)=>T)|T,
  ):T[];
export default updateItemsByFilter;
