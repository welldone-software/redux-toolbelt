/**
 * Updates the properties of an item at a specified index of an array.
 *
 * @template T An optional specicifc type
 *
 * @param {T[]} arr An optional specicifc type
 *
 * @param {number} index The index of the item we want to update
 *
 * @param {T} newProps The new item
 *
 * @returns {T[]} A new array
 */
export declare function updateItem<T = any>(arr:T[], index: number, newProps:T): T[];
export default updateItem;
