/**
 * Removes an item from the specified index of an array.
 *
 * @template T An optional specicifc type
 *
 * @param {T[]} arr An array of specific type T
 *
 * @param {number} index The index where the item(s) should be removed from
 *
 * @returns {T[]} A new array
 */
export declare function removeItem<T = any>(arr:T[], index:number):T[]
export default removeItem;
