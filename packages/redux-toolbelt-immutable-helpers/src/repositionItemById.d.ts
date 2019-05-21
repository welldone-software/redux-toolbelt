import { PlainObject } from ".";

/**
 * Moves an item in an array from one index to another
 *
 * @template T An optional specific type
 *
 * @param {T[]} arr An array of specific type T
 *
 * @param {*} itemId The item id we want to reposition
 *
 * @param {(number | 'start' | 'end')} newIndex The index of the item we want to reposition
 *
 * @param {(item:T) => any} [idSelector] When working with an array of objects we can set a mapper function
 * that will point to the correct property to filter the array by. for example
 * (item) => item.id. If no idSelector was set, 'id' property will be selected by default
 *
 * @returns {T[]} A new array
 */
export declare function repositionItemById<T extends PlainObject = {}>(
  arr: T[],
  itemId: any,
  newIndex: number | 'start' | 'end',
  idSelector?:(item:T) => any
  ): T[];
export default repositionItemById;
