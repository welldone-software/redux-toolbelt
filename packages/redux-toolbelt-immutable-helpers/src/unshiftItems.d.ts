/**
 * Adds items to the beginning of an array.
 *
 * @template T An optional specicifc type
 *
 * @param {T[]} arr An array of specific type T
 *
 * @param {T} newItems An item(s) of specific type to add into the array
 *
 * @returns {T[]} A new array
 */
export declare function unshiftItems<T = any>(arr: T[], newItems:T): T[];
export default unshiftItems;
