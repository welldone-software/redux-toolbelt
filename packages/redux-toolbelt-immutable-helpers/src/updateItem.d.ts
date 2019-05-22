import { PlainObject } from ".";

/**
 * Updates the properties of an item at a specified index of an array of objects.
 *
 * @template T An optional specicifc type
 *
 * @param {T[]} arr An optional specicifc type
 *
 * @param {number} index The index of the item we want to update
 *
 * @param {T} newProps The new properties to update thew item with
 * The new properties to update the item with, or a mapper function for te properties
 *
 * @returns {T[]} A new array
 */
export declare function updateItem<T extends PlainObject = {}>(
  arr:T[],
  index: number,
  newProps:((...args:any)=>T)|T
  ): T[];
export default updateItem;
