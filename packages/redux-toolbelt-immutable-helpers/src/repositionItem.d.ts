/**
 * Moves an item in an array from one index to another.
 *
 * @template T An optional specicifc type
 *
 * @param {T[]} arr An array of specific type T
 *
 * @param {number} oldIndex The index of the item we want to reposition
 *
 * @param {number} newIndex The new index to move the item to
 *
 * @returns {T[]} A new array
 */
export declare function repositionItem<T = any>(
  arr:T[],
  oldIndex: number | 'start' | 'end',
  newIndex: number
  ):T[];
export default repositionItem;
