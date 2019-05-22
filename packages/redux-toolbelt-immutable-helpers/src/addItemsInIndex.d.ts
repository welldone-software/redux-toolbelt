/**
 * Adds items to an array at the specified index.
 *
 * @template T An optional specific type
 *
 * @param {T[]} arr An array of specific type T
 *
 * @param {number} index The index where the item(s) should be added in
 *
 * @param {T|T[]} newItems An item or array of items of specific type to add into the array
 *
 * @returns {T[]} A new array
 */
export declare function addItemsInIndex<T = any>(arr: T[], index: number, newItems:T|T[]): T[];
export default addItemsInIndex;
