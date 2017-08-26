import updateObjectProperty from './updateObjectProperty'

import isFunction from 'lodash.isfunction'
import isPlainObject from 'lodash.isplainobject'

// V1: updateObjectProperties(obj, {prop1: newVal, prop2: updateFunc})
// V2: updateObjectProperties(obj, [prop1, prop2], 'newVal')
// V3: updateObjectProperties(obj, [prop1, prop2], (value, name) => 'newValue')
// V4: updateObjectProperties(obj, (value, name) => 'newValue')
export default function updateObjectProperties(obj, propsOrUpdateFunc, newValOrUpdateFunc) {
  if(isPlainObject(propsOrUpdateFunc)){
    return updateObjectPropertiesV1(obj, propsOrUpdateFunc)
  }

  if(isFunction(propsOrUpdateFunc)){
    return updateObjectPropertiesV3(obj, Object.keys(obj), propsOrUpdateFunc)
  }

  if(isFunction(newValOrUpdateFunc)){
    return updateObjectPropertiesV3(obj, propsOrUpdateFunc, newValOrUpdateFunc)
  }

  return updateObjectPropertiesV2(obj, propsOrUpdateFunc, newValOrUpdateFunc)
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
