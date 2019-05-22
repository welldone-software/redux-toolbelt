import { PlainObject } from ".";

/**
 * Updates a single property of an object
 *
 * @template T An optional specific type
 *
 * @param {T} obj An object to update
 *
 * @param {keyof T} prop A property name to update
 *
 * @param {T[keyof T]} val A new value for the property we want to update
 *
 * @returns {T} A new object
 */
export declare function updateObjectProperty<T extends PlainObject = {}>(
  obj: T,
  prop: keyof T,
  val:T[keyof T]
  ):T;
export default updateObjectProperty;
