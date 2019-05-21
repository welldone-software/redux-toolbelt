import { PlainObject } from ".";

/**
 * Filters array items by id field or other calculated primitive value.
 *
 * @template T An optional specicifc type
 *
 * @param {T[]} arr An array of specific type T
 *
 * @param {any[]} itemsIds An array of IDs used to filter the array by
 *
 * @param {(item:T) => any} [idSelector]
 * When working with an array of objects we can set a mapper function
 * that will point to the correct property to filter the array by. for example
 * (item) => item.id
 *
 * @returns {T[]} A new array
 */
export declare function filterByIds<T extends PlainObject = {}>(
  arr: T[],
  itemsIds: any[],
  idSelector?:(item:T) => any
  ): T[];
export default filterByIds;
