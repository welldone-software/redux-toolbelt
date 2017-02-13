# redux-toolbelt

A set of tools for quicker, easier and safer redux development by [welldone-software](http://welldone-software.com).



## Enhanced action creators

<!--
### `makeActionCreator(name: string, options?: {prefix: string, defaultMeta: object}) : (payload?: any, meta?: any) => {type: string, payload?: any, meta?: any}`)
-->

### `makeActionCreator(name [, options])`
Create an FSA compliant action creator, with support for prefix (explicit and environment based), default and dynamic meta and without a need to use constants.

## Enhanced async actions

### `makeAsyncActionCreator(baseName [, options])`

### `makeAsyncReducer(asyncActionCreator, fn)`

## Redcuer composition

### `composeReducer(...reducers)`
