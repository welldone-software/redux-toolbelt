import escapeRegexp from 'escape-string-regexp'
import { map, filter } from 'rxjs/operators'

const makeSuffixesEpic = (mapper, suffixes, metaPredicate) => (
  action$,
  state$,
  dependencies
) => {
  const array = Array.isArray(suffixes) ? suffixes : [suffixes]
  const regex = new RegExp(array.map(e => `(${escapeRegexp(e)}$)`).join('|'))
  return action$.pipe(
    filter(({ meta }) => !metaPredicate || metaPredicate(meta)),
    map(action => ({ ...action, typePrefix: action.type.replace(regex, '') })),
    filter(({ type, typePrefix }) => typePrefix !== type),
    map(action => mapper(action, state$, dependencies))
  )
}

export default makeSuffixesEpic
