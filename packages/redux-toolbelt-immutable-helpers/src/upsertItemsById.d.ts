import { PlainObject } from ".";

/**
 * Updates or adds items to an array by the id field value or other calculated primitive value.
 *
 * @template T An optional specific type
 *
 * @param {T[]} arr An array of specific type T
 *
 * @param {(T|T[])} updatedItems An object or array of objects
 *
 * @param {(item:T) => any} [idSelector]
 * When working with an array of objects we can set a mapper function
 * that will point to the correct property to filter the array by. for example
 * (item) => item.id. If no idSelector was set, 'id' property will be selected by default
 *
 * @returns {T[]} A new array
 */
export declare function upsertItemsById<T extends PlainObject = {}>(
  arr: T[],
  updatedItems: T|T[],
  idSelector?: (item:T) => any
): T[];
export default upsertItemsById;
