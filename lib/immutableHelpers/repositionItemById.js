import defaultIdSelector from './defaultIdSelector'
import repositionItem from './repositionItem'

// repositionItemById(arr, 'id_1', 3)
// repositionItemById(arr, 'id_1', 'start')
// repositionItemById(arr, 'id_1', 'end')
// repositionItemById(arr, 'id_1', 3, item => item.id)
export default function repositionItemById(arr, itemId, newIndex, idSelector = defaultIdSelector) {
  const itemIndex = arr.findIndex(item => idSelector(item) === itemId)
  return itemIndex < 0 ? arr :
    repositionItem(arr, itemIndex, newIndex)
}
