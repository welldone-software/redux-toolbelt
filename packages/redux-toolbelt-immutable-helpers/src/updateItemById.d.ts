import { PlainObject } from ".";

/**
 * Updates the properties of an item by id field or other calculated primitive value
 *
 * @template T An optional specific type
 *
 * @param {T[]} arr An array of specific type T
 *
 * @param {*} id The item id we want to update the array by
 *
 * @param {((item:T)=>T)|T} newProps
 * The new properties to update the item with, or a mapper function for te properties
 *
 * @param {(item:T) => any} idSelector
 * When working with an array of objects we can set a mapper function
 * that will point to the correct property to filter the array by. for example
 * (item) => item.id. If no idSelector was set, 'id' property will be selected by default
 *
 * @returns {T[]} A new array
 */
export declare function updateItemById<T extends PlainObject = {}>(
  arr: T[],
  id: any,
  newProps: ((item:T)=>T)|T,
  idSelector: (item:T) => any
  ):T[];
export default updateItemById;
