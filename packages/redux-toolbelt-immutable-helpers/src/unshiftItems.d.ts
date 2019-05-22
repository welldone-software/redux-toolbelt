/**
 * Adds items to the beginning of an array.
 *
 * @template T An optional specific type
 *
 * @param {T[]} arr An array of specific type T
 *
 * @param {T|T[]} newItems An item or array of items of specific type to add into the array
 *
 * @returns {T[]} A new array
 */
export declare function unshiftItems<T = any>(arr: T[], newItems:T|T[]): T[];
export default unshiftItems;
