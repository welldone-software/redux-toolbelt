const isActionCreator = obj => !!(
  typeof(obj) === 'function' &&
  obj.TYPE &&
  obj.TYPE === obj.toString()
)

export default isActionCreator
