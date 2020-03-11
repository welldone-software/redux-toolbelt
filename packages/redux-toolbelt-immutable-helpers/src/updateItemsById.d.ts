import { PlainObject } from ".";

/**
 * Updates items in an array by the id field value or other calculated primitive value
 *
 * @template T An optional specific type
 *
 * @param {T[]} arr An array of specific type T
 *
 * @param {T[]} updatedItems An array of objects to update the array with
 *
 * @param {(item:T) => any} idSelector
 * When working with an array of objects we can set a mapper function
 * that will point to the correct property to filter the array by. for example
 * (item) => item.id. If no idSelector was set, 'id' property will be selected by default
 *
 * @returns {T[]} A new array
 */
export declare function updateItemsById<T extends PlainObject = {}>(
  arr: T[],
  updatedItems:T[],
  idSelector?: (item:T) => any
): T[];
export default updateItemsById
