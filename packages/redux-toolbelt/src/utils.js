import isPlainObject from 'lodash.isplainobject'

export const isActionCreator = obj => !!(
  typeof(obj) === 'function' &&
  obj.TYPE &&
  obj.TYPE === obj.toString()
)

export const getOptions = ({argsMapper: userArgsMapper, options = {}, defaultOptions = {}}) => {
  if (isPlainObject(userArgsMapper)) {
    return { ...defaultOptions, ...userArgsMapper }
  }
  else {
    const argsMapper = userArgsMapper || options.argsMapper || defaultOptions.argsMapper
    return {
      ...defaultOptions,
      ...options,
      ...(argsMapper ? { argsMapper } : {}),
    }
  }
}
