import isPlainObject from 'lodash.isplainobject'
import isArray from 'lodash.isarray'
import isFunction from 'lodash.isfunction'

const FORCE_NOT_RECURSIVE_SUFFIX = '__notRecursive__'

// updateRecursive(obj, {prop1: objToMerge, prop2: {prop3__replace__: 'newValue'})
// updateRecursive(array, {index1: newVal, index2: newVal2))
export default function updateRecursive(obj, recursiveObj) {
  if(!isPlainObject(recursiveObj)){
    throw new Error('updateObjectRecursive second argument must be a plain object ({})')
  }

  const updateObj = getUpdateObj(obj, recursiveObj)
  if(Object.keys(updateObj).length === 0){
    return obj
  }

  if(isArray(obj)){
    return obj.map((val, key) => updateObj[key] || val)
  }

  return { ...obj, ...updateObj }
}

function getUpdateObj(obj, recursiveObj){
  const updateObj = {}

  Object.keys(recursiveObj).forEach(updateKey => {
    const forceNotRecursive = updateKey.endsWith(FORCE_NOT_RECURSIVE_SUFFIX)
    const key = forceNotRecursive ?
      updateKey.slice(0, -FORCE_NOT_RECURSIVE_SUFFIX.length) : updateKey

    const val = obj[key]
    let newVal = recursiveObj[updateKey]

    if(isFunction(newVal)){
      newVal = newVal(val)
    }
    else if(!forceNotRecursive && (isPlainObject(newVal) || isArray(newVal))){
      newVal = updateRecursive(val, newVal)
    }

    if(newVal !== val){
      updateObj[key] = newVal
    }
  })

  return updateObj
}
