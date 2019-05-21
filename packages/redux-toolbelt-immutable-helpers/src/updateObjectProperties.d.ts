import { PlainObject } from ".";

/**
 * Updates multiple properties of an object.
 * There are several ways to use `updateObjectProperties` function.
 *
 * - Update the object with new object by passing second paramter as
 * an object with updated properties, for example:
 * `updateObjectProperties(obj, {prop1:value1, prop2:value2})`
 *
 * - Update multiple items with the same value. Passing second parameter as an
 * array of properties and the third as a value:
 * `updateObjectProperties(obj, [prop1, prop2], value)`
 *
 * - Update the chosen properties using an updater function. Like the previous
 * example, only with an updater function instead of raw value:
 * `updateObjectProperties(obj, [prop1, prop2], (value, prop)=>any)`
 *
 * - Update all properties using an updater function:
 * `updateObjectProperties(obj,(value, prop)=>any)`
 *
 * @template T An optional specific type
 *
 * @param {T} obj An object to update
 *
 * @param {(T|(keyof T)[]|((value:T[keyof T], prop: keyof T)=>any))} propsOrUpdateFunc
 * An object with the properties that needs to be updated, an array of property names,
 * or an updater function
 *
 * @param {(T[keyof T]|((value:T[keyof T], prop: keyof T)=>any))} [newValOrUpdateFunc]
 * A vlaue or an updater function
 *
 * @returns {T} A new object
 */
export declare function updateObjectProperties<T extends PlainObject = {}>(
  obj: T,
  propsOrUpdateFunc: T|(keyof T)[]|((value:T[keyof T], prop: keyof T)=>any),
  newValOrUpdateFunc?:T[keyof T]|((value:T[keyof T], prop: keyof T)=>any)
): T;
export default updateObjectProperties;
