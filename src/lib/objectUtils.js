
/**
 *
 * @param obj
 * @param key
 * @returns {boolean}
 * duplicates Reflect.has as in:
 *     https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/has
 */
export const has = (obj, key) => {
    if (!isObject(obj)) {
        throw new TypeError('param is not an object')
    }
    return (key in obj)
}

const isObject = (obj) => {
    return (obj !== null && typeof obj === 'object')
}

/**
 *
 * @param obj
 * @returns An Array of the target object's own property keys
 * duplicates Reflect.has as in:
 *     https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/ownKeys
 */
export const ownKeys = (obj) => {
    let tmpRes = []
    
    if (!isObject(obj)) {
        throw new TypeError('param is not an object')
    }
    
    tmpRes = Object.getOwnPropertyNames(obj).
        concat(Object.getOwnPropertySymbols(obj))
    return tmpRes
} 