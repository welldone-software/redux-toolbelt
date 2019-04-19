import { ACTION_ASYNC_FAILURE_SUFFIX } from 'redux-toolbelt'
import makeSuffixesEpic from './makeSuffixesEpic'

const makeGlobalErrorEpic = mapper =>
  makeSuffixesEpic(
    ACTION_ASYNC_FAILURE_SUFFIX,
    mapper,
    meta => !meta || !meta.shouldIgnoreGlobalError
  )

export default makeGlobalErrorEpic
