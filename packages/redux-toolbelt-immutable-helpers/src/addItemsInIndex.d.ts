/**
 * Adds items to an array at the specified index.
 *
 * @template T An optional specicifc type
 *
 * @param {T[]} arr An array of specific type T
 *
 * @param {number} index The index where the item(s) should be added in
 *
 * @param {T} newItems An item(s) of specific type to add into the array
 *
 * @returns {T[]} A new array
 */
export declare function addItemsInIndex<T = any>(arr: T[], index: number, newItems:T): T[];
export default addItemsInIndex;
