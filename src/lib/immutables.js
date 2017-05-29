import inRange from 'lodash.inrange'
import isMatch from 'lodash.ismatch'
import isMatchWith from 'lodash.ismatchwith'
import isEqual from 'lodash.isequal'
import isFunction from 'lodash.isfunction'
import without from 'lodash.without'
import constant from 'lodash.constant'
import concat from 'lodash.concat'

const DEFAULT_ID_SELECTOR = item => item.id
const EMPTY_ARRAY = []

// addItems(arr, newItem, newItem2)
export function addItems(arr, ...newItems) {
  if (newItems.length === 0) {
    return arr || EMPTY_ARRAY
  }
  if (!arr || arr.length == 0) {
    return newItems
  }
  return [...arr, ...newItems]
}

// addItemsInIndex(arr, 2, newItem, newItem2)
export function addItemsInIndex(arr, index, ...newItems) {
  if (newItems.length === 0) {
    return arr || EMPTY_ARRAY
  }
  return [
    ...arr.slice(0, index),
    ...newItems,
    ...arr.slice(index),
  ]
}

// removeItem(arr, 2)
export function removeItem(arr, index) {
  return index > arr.length - 1 ? arr : [
    ...arr.slice(0, index),
    ...arr.slice(index + 1),
  ]
}

// removeItemsById(arr, ['id_1', 'id_2'])
// removeItemsById(arr, ['id_1', 'id_2'], item => item.id)
export function removeItemsById(arr, itemsToDelete, idSelector = DEFAULT_ID_SELECTOR) {
  if (!arr || arr.length === 0) {
    return arr || EMPTY_ARRAY
  }
  const idsToDelete = itemsToDelete.map(idSelector)
  const newArray = arr.filter(item => !idsToDelete.includes(idSelector(item)))
  return arr.length === newArray.length ? arr : newArray
}

// replaceItem(arr, 2, newItem)
export function replaceItem(arr, index, newItem) {
  return [
    ...arr.slice(0, index),
    newItem,
    ...arr.slice(index + 1),
  ]
}

function _getArrIndex(arr, index) {
  switch (index) {
    case 'start':
      return 0
    case 'end':
      return arr.length - 1
    default:
      return index
  }
}

// repositionItem(arr, 2, 4)
// repositionItem(arr, 2, 'start')
// repositionItem(arr, 2, 'end')
export function repositionItem(arr, oldIndex, newIndex) {
  if (!arr || arr.length === 0) {
    return arr || EMPTY_ARRAY
  }
  const actualOldIndex = _getArrIndex(arr, oldIndex)
  const actualNewIndex = _getArrIndex(arr, newIndex)
  if (actualOldIndex === actualNewIndex) {
    return arr
  }
  const item = arr[actualOldIndex]
  const newArray = without(arr, item)

  newArray.splice(actualNewIndex, 0, item)
  return newArray
}

// repositionItemById(arr, 'id_1', 3)
// repositionItemById(arr, 'id_1', 'start')
// repositionItemById(arr, 'id_1', 'end')
// repositionItemById(arr, 'id_1', 3, item => item.id)
export function repositionItemById(arr, itemId, newIndex, idSelector = DEFAULT_ID_SELECTOR) {
  const itemIndex = arr.findIndex(item => idSelector(item) === itemId)
  return itemIndex < 0 ? arr :
    repositionItem(arr, itemIndex, newIndex)
}

function _makeGetUpdatedPropsFunc(newProps) {
  return isFunction(newProps) ? newProps : item => newProps
}

// updateItem(arr, 2, {prop1: 'new value', prop2: 'new value'})
// updateItem(arr, 2, item => ({prop: item.prop+2, prop2: 'new value'}))
export function updateItem(arr, index, newProps) {
  if (!arr || !inRange(index, arr.length)) {
    return arr || EMPTY_ARRAY
  }
  const item = arr[index]
  const updatedProps = _makeGetUpdatedPropsFunc(newProps)(item)

  return isMatch(item, updatedProps) ? arr : [
    ...arr.slice(0, index),
    {
      ...item,
      ...updatedProps,
    },
    ...arr.slice(index + 1),
  ]
}

// updateItemById(arr, 2, {prop1: 'new value', prop2: 'new value'})
// updateItemById(arr, 2, {prop1: 'new value', prop2: 'new value'}, item => item.id)
// updateItemById(arr, 2, item => ({prop: item.prop+2, prop2: 'new value'}))
// updateItemById(arr, 2, item => ({prop: item.prop+2, prop2: 'new value'}), item => item.id)
export function updateItemById(arr, id, newProps, idSelector = DEFAULT_ID_SELECTOR) {
  if (!arr || arr.length === 0) {
    return arr || EMPTY_ARRAY
  }
  const index = arr.findIndex(item => idSelector(item) === id)
  return updateItem(arr, index, newProps)
}


// updateItemsByFilter(arr, item => item.flag, {prop1: 'new value', prop2: 'new value'}) {
// updateItemsByFilter(arr, item => item.flag, item => ({prop: item.prop+2, prop2: 'new value'}))
export function updateItemsByFilter(arr, filter, newProps) {
  const getUpdatedProps = _makeGetUpdatedPropsFunc(newProps)

  let hasChanges = false
  const result = arr.map(item => {
    if (!filter(item)) {
      return item
    }
    const updatedProps = getUpdatedProps(item)
    if (isMatch(item, updatedProps)) {
      return item
    }
    hasChanges = true
    return {...item, ...updatedProps}
  })

  return hasChanges ? result : arr
}

// updateItemsById(arr, [{id: 'id_1', prop: 3, prop2: 'val'}])
// updateItemsById(arr, [{id: 'id_1', prop: 3, prop2: 'val'}], item => item.id)
export function updateItemsById(arr, updatedItems, idSelector = DEFAULT_ID_SELECTOR) {
  if (!updatedItems || updatedItems.length === 0) {
    return arr || EMPTY_ARRAY
  }
  const updatedItemsMap = new Map(updatedItems.map(item => [idSelector(item), item]))

  let hasChanges = false
  const result = arr.map(item => {
    const itemId = idSelector(item)
    if (!updatedItemsMap.has(itemId)) {
      return item
    }
    const updatedItem = updatedItemsMap.get(itemId)
    const isItemMatching = isMatchWith(item, updatedItem, (objValue, srcValue) => isEqual(objValue, srcValue))
    if (isItemMatching) {
      return item
    }
    hasChanges = true
    return {...item, ...updatedItem}
  })

  return hasChanges ? result : arr
}

// upsertItemsById(arr, [{id: 'id_1', prop: 3, prop2: 'val'}])
// upsertItemsById(arr, [{id: 'id_1', prop: 3, prop2: 'val'}], item => item.id)
export function upsertItemsById(arr, updatedItems, idSelector = DEFAULT_ID_SELECTOR) {
  if (!updatedItems || updatedItems.length === 0) {
    return arr || EMPTY_ARRAY
  }
  if (!arr) {
    return updatedItems || EMPTY_ARRAY
  }
  const updatedItemsMap = new Map(updatedItems.map(item => [idSelector(item), item]))

  let hasChanges = false
  const result = arr.map(item => {
    const itemId = idSelector(item)
    if (!updatedItemsMap.has(itemId)) {
      return item
    }
    const updatedItem = updatedItemsMap.get(itemId)
    updatedItemsMap.delete(itemId)
    if (isMatch(item, updatedItem)) {
      return item
    }
    hasChanges = true
    return {...item, ...updatedItem}
  })
  updatedItemsMap.forEach(item => result.push(item))

  return hasChanges ? result : arr
}

// filterByIds(arr, ['id_1', 'id_2'])
// filterByIds(arr, ['id_1', 'id_2'], item => item.id)
export function filterByIds(arr, itemsIds, idSelector = DEFAULT_ID_SELECTOR) {
  if (!arr || arr.length === 0 || !itemsIds) {
    return arr || EMPTY_ARRAY
  }
  if (itemsIds.length === 0) {
    return EMPTY_ARRAY
  }
  const filteredArr = arr.filter(item => itemsIds.includes(idSelector(item)))
  return filteredArr.length === arr.length ? arr : filteredArr
}

// updateObjectProperty(obj, prop, newVal)
// updateObjectProperty(obj, prop, updateFunc)
export function updateObjectProperty(obj, prop, val) {
  const updateFunc = isFunction(val) ? val : constant(val)

  const oldVal = obj[prop]
  const newVal = updateFunc(oldVal)

  return oldVal === newVal ? obj : {
    ...obj,
    [prop]: newVal,
  }
}

// updateObjectProperties(obj, {prop1: newVal, prop2: updateFunc})
export function updateObjectProperties(obj, updates) {
  return Object.keys(updates).reduce(
    (result, key) => updateObjectProperty(result, key, updates[key]),
    obj
  )
}

export const makeArray = assets => {
  // Convers the object into array (if it's not an array already)
  return concat(assets)
}
