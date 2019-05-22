import { PlainObject } from ".";

/**
 * Removes array items by the id field value or other calculated primitive value.
 * Mostly useful for array of objects
 *
 * @template T An optional specific type
 *
 * @param {T[]} arr An array of specific type T
 *
 * @param {any[]} itemsToDelete An array of items used to filter the array by
 *
 * @param {(item:T) => any} [idSelector]
 * When working with an array of objects we can set a mapper function
 * that will point to the correct property to filter the array by. for example:
 * (item) => item.id.
 * If no idSelector was set, 'id' property will be selected by default
 *
 * @returns {T[]} A new array
 */
export declare function removeItemsById<T extends PlainObject = {}>(arr:T[], itemsToDelete: any[], idSelector?:(item:T) => any):T[]
export default removeItemsById;
