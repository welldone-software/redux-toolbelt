import updateObjectProperty from './updateObjectProperty'

// updateObjectProperties(obj, {prop1: newVal, prop2: updateFunc})
export default function updateObjectProperties(obj, updates) {
  return Object.keys(updates).reduce(
    (result, key) => updateObjectProperty(result, key, updates[key]),
    obj,
  )
}
