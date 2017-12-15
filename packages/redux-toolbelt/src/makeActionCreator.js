import { has, ownKeys } from './_objectUtils'
import { getOptions } from './utils'
import defaultOptions from './_defaultActionCreatorOptions'

/**
 * @typedef {function(*, *): {type: string, payload: *, meta: *}} ActionCreator
 * @property {string} TYPE - action type
 *
 * @param name
 * @param [argsMapper]
 * @param [options]: {prefix, defaultMeta}
 *
 * @returns {ActionCreator}
 */
export default function makeActionCreator(name, argsMapper, options) {
  options = getOptions({ argsMapper, options, defaultOptions })
  argsMapper = options.argsMapper

  const type = `${options.prefix}${name}`

  const actionCreator = (...args) => {
    const mapped = argsMapper(...args)
    let payload = mapped
    let meta = undefined
    if (mapped) {
      const hasPayload = has(mapped, 'payload')
      const hasMeta = has(mapped, 'meta')
      const hasMore = ownKeys(mapped).length > 2
      if (hasPayload !== hasMeta || hasPayload && hasMeta && hasMore) {
        throw new Error('Full mapper should return both meta and payload, and only these two.')
      }
      if (hasPayload) {
        payload = mapped.payload
        meta = mapped.meta
      }
    }
    return {
      type,
      payload,
      meta: options.defaultMeta ? Object.assign({}, options.defaultMeta, meta) : meta,
    }
  }

  actionCreator.TYPE = type
  actionCreator.toString = () => type

  return actionCreator
}

makeActionCreator.withDefaults = ({ prefix = '', defaultMeta }) => (baseName, argsMapper, options) => {
  options = Object.assign({}, { prefix, defaultMeta }, options)
  return makeActionCreator(baseName, argsMapper, options)
}
