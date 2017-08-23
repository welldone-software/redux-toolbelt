import updateObjectProperty from './updateObjectProperty'

import isFunction from 'lodash.isfunction'
import isArray from 'lodash.isarray'

// updateObjectProperties(obj, {prop1: newVal, prop2: updateFunc})
// updateObjectProperties(obj, [prop1, prop2], 'newVal')
// updateObjectProperties(obj, [prop1, prop2], (value, name) => 'newValue')
export default function updateObjectProperties(obj, props, newValOrUpdateFunc) {
  if(!isArray(props)){
    return updateObjectPropertiesV1(obj, props)
  }

  if(!isFunction(newValOrUpdateFunc)){
    return updateObjectPropertiesV2(obj, props, newValOrUpdateFunc)
  }

  return updateObjectPropertiesV3(obj, props, newValOrUpdateFunc)
}

// updateObjectProperties(obj, {prop1: newVal, prop2: updateFunc})
function updateObjectPropertiesV1(obj, props) {
  return Object.keys(props).reduce(
    (result, key) => updateObjectProperty(result, key, props[key]),
    obj,
  )
}

// updateObjectProperties(obj, [prop1, prop2], 'newVal')
function updateObjectPropertiesV2(obj, props, newVal) {
  return props.reduce(
    (result, prop) => updateObjectProperty(result, prop, newVal),
    obj,
  )
}

// updateObjectProperties(obj, [prop1, prop2], (propValue, propName) => 'newVal')
function updateObjectPropertiesV3(obj, props, func) {
  return props.reduce(
    (result, prop) => updateObjectProperty(result, prop, func(obj[prop], prop)),
    obj
  )
}
