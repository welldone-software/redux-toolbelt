# redux-toolbelt-thunk

A set of helper functions that extends `redux-toolbelt` for usage with `redux-thunk`.

<p align="center">
  <img align="center" src="https://raw.githubusercontent.com/welldone-software/redux-toolbelt/master/redux-toolbelt-logo.png" alt="redux-toolbelt logo"/>
</p>

## TOC

<!-- toc -->

- [Installation](#installation)
- [Import](#import)
- [Motivation](#motivation)
- [Usage](#usage)
    + [`makeThunkAsyncActionCreator(baseName, asyncFn [,argsMapper[, options]])`](#makethunkasyncactioncreatorbasename-asyncfn-argsmapper-options)
  * [Arguments](#arguments)
  * [Returns](#returns)
  * [`_toolbeltAsyncFnArgs`](#_toolbeltasyncfnargs)
  * [withDefaults](#withdefaults)

<!-- tocstop -->

## Installation
First, you have to install [`redux-thunk`](https://www.npmjs.com/package/redux-thunk) npm package as specified in it'd docs.

Then install the [`redux-toolbelt-thunk`](https://www.npmjs.com/package/redux-toolbelt-thunk) npm package.
```sh
npm i -S redux-toolbelt redux-toolbelt-thunk

# or

yarn add redux-toolbelt redux-toolbelt-thunk
```

## Import
You may import the functions you'd like to use using one of the two methods:
```js
import {makeThunkAsyncActionCreator} from 'redux-toolbelt-thunk'

// or

import makeThunkAsyncActionCreator from 'redux-toolbelt/lib/makeThunkAsyncActionCreator'

```

## Motivation
`makeAsyncActionCreator` can be very useful to create an action creator that uses promises and reports its progress to the Redux state:
```js
// Instead of:
const fetchUser = makeAsyncActionCreator('FETCH_USER')

dispatch(fetchUser('user_01'))
fetchUserFromServer('user_01')
  .then(result => dispatch(fetchUser.success(result)))
  .then(error => dispatch(fetchUser.failure(error)))
```  

`makeThunkAsyncActionCreator` replaces these with one line:

```js
const fetchUser = makeThunkAsyncActionCreator('FETCH_USER', fetchUserFromServer)
dispatch(fetchUser('user_01'))
// this dispatches the action: `{ type: 'FETCH_USER', payload: 'user_01' }`
// calls fetchUserFromServer
// when fetchUserFromServer's resolves, it calls `fetchUser.success` with the result.
// if fetchUserFromServer's fails, it calls `fetchUser.failure` with the error.
```

## Usage
#### `makeThunkAsyncActionCreator(baseName, asyncFn [,argsMapper[, options]])`
### Arguments
* `baseName` - The name of the action, and prefixes of sub-actions created.
* `asyncFn` - The function to execute when the action is called. It should return a Promise. When it resolves, it will trigger the success sub-action and if it rejects it will trigger the failure action.

  `asyncFn` will be called with the arguments passed to the action with the addition of the following arguments: `{getState, dispatch, extraThunkArg}`. [extraThunkArg is explained here](https://github.com/reduxjs/redux-thunk#injecting-a-custom-argument).
* `argsMapper` - Maps the arguments that are passed to the action to the `payload` that will be used on the action dispatched when action is called and the `meta` that will be used when both the action and it's sub-actions are called.
* `options`
  * `prefix` - Defaults to `''`.

    Prefixes the action and sub-action name. Mostly useful with `makeThunkAsyncActionCreator.withDefaults` that will be described below.
  * `defaultMeta` - Defaults to `undefined`.

    Adds metadata to the action and sub-actions:

    ```js
    const getUserFromServer = userId => Promise.resolve({id: userId})

    const fetchUserAction = makeAsyncThunkActionCreator(
      'FETCH_USER', //
      getUserFromServer,
      {defaultMeta: {ignore: true}}
    )

    fetchUserAction('01', {log: true})
    // {
    //   type: 'FETCH_USER',
    //   payload: '01',
    //   meta: {
    //     debug: false,
    //     log: false,
    //     _toolbeltAsyncFnArgs: ['user_01', {log: true}]
    //   }
    // }
    ```
  * `argsMapper` - Defaults to `const trivialArgsMapper = (payload, meta) => ({payload, meta})`

    Same as the `argsMapper` argument described above. The argument takes priority over the option.

### Returns
An action creator that when called and dispatched, it will:

* Dispatch an action with the `type` of `baseName` and `payload` and `meta` that are based on the arguments of the call, possibly mapped via `argsMapper`, if present.
* Call the `asyncFn` and wait on the Promise it should return.
* If it resolves, the `success` sub-action is dispatched with the `result` of the Promise.
* If it rejects, the `failure` sub-action is dispatched with the `error` of the Promise.

### `_toolbeltAsyncFnArgs`
This property is always added to the `meta` of every action and sub-action that are created with `thunkAsyncActionCreator` and reflects the arguments that it was called with.

```js
const fetchUser = makeThunkAsyncActionCreator('FETCH_USER', fetchUserFromServer)
console.log(fetchUser('00'))
// {
//   type: 'FETCH_USER',
//   payload: ['00'],
//   meta: { _toolbeltAsyncFnArgs: ['00'] }
// }
```

### withDefaults
Creates an instance of `makeThunkAsyncActionCreator` with the specified options:

```js
const userMakeThunkAsyncActionCreator = makeThunkAsyncActionCreator.withDefaults({
  prefix: 'USER@',
  defaultMeta: {log: true},
  argsMapper: (...args) => ({payload: args})
})

const fetchUser = userMakeThunkAsyncActionCreator('FETCH_USER', fetchUserFromServer)
console.log(fetchUser.TYPE)
// 'USER@FETCH_USER'

console.log(fetchUser('00'))
// {
//   type: 'USER@FETCH_USER',
//   payload: ['00'],
//   meta: {
//     log: true,
//     _toolbeltAsyncFnArgs: ['00']
//   }
// }

console.log(fetchUser.success({id: 'user00'}))
// {
//   type: 'USER@FETCH_USER@ASYNC_SUCCESS',
//   payload: {
//     id: 'user00'
//   },
//   meta: {
//     log: true,
//     _toolbeltAsyncFnArgs: ['00']
//   }
// }
```
