import { ACTION_ASYNC_FAILURE_SUFFIX } from 'redux-toolbelt'
import makeSuffixesEpic from './makeSuffixesEpic'

const makeGlobalErrorEpic = (
  mapper,
  suffixes = ACTION_ASYNC_FAILURE_SUFFIX,
  metaProp = 'shouldIgnoreGlobalError'
) => makeSuffixesEpic(mapper, suffixes, meta => !meta || !meta[metaProp])

export default makeGlobalErrorEpic
