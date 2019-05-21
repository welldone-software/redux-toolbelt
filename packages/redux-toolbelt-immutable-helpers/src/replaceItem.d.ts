/**
 * Replaces an item at the specified index of an array.
 *
 * @template T An optional specific type
 *
 * @param {T[]} arr An array of specific type T
 *
 * @param {number} index The index where the item should be replaced in
 *
 * @param {T} newItem The new item that should replace the old one
 *
 * @returns {T[]} A new array
 */
export declare function replaceItem<T = any>(arr: T[], index: number, newItem:T):T[];
export default replaceItem;
