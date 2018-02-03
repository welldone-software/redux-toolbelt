# redux-toolbelt-thunk

A set of helper functions that extends `redux-toolbelt` for usage with `redux-thunk`.

<p align="center">
  <img align="center" src="https://raw.githubusercontent.com/welldone-software/redux-toolbelt/master/redux-toolbelt-logo.png" alt="redux-toolbelt logo"/>
</p>

## TOC

<!-- toc -->

- [Installation](#installation)
- [Usage](#usage)
- [API Reference](#api-reference)
  * [`makeThunkAsyncActionCreator(baseName, asyncFn [, options])`](#makeThunkAsyncActionCreatorbasename-asyncfn--options)

<!-- tocstop -->

## Installation
The tools are available in the `redux-toolbelt` npm package.
```sh
npm i -S redux-toolbelt redux-toolbelt-thunk redux-thunk

# or

yarn add redux-toolbelt redux-toolbelt-thunk redux-thunk
```

## Import
import the functions you like to use using one of the two methods:
```js
import {makeThunkAsyncActionCreator} from 'redux-toolbelt-thunk'

// or

import makeThunkAsyncActionCreator from 'redux-toolbelt/lib/makeThunkAsyncActionCreator'

```

## Motivation 
`makeAsyncActionCreator` can be very useful to create an action creator that will be called around promises and report their progress to the redux state:
```js
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
// upon fetchUserFromServer's resolve, it calls `fetchUser.success` with the result.
// upon fetchUserFromServer's failure, it calls `fetchUser.failure` with the error.
```

## Usage
####`makeThunkAsyncActionCreator(baseName, asyncFn [,argsMapper, options])`
### Arguments
* `baseName` - The name of the action, and prefixes of sub-actions created.
* `asyncFn` - The function to execute when the action is called. It should return a promise that when resolved will trigger the success sub-action and if rejects will trigger the failure action.
  
  `asyncFn` will be called with the arguments passed to the action with the addition of the following argument: `{getState, dispatch}`
* `argsMapper` - Maps the arguments that are passed to the action to `payload` that will be used on the action dispatched when action is called and `meta` that will be used when the action and it's sub-actions are called.
* `options`
  * `prefix` - Defaults to `''`.
    
    Prefixes the action and sub-action name. Mostly useful with `makeThunkAsyncActionCreator.withDefaults` that will be described below.
  * `defaultMeta` - Defaults to `undefined`.
    
    Adds metadata to the action and sub-actions:

    ```js
    const fetchUserAction = makeAsyncThunkActionCreator(
      'FETCH_USER', //
      userId => Promise.resolve({id: userId}),
      { defaultMeta: {ignore: true} }
    )
    
    fetchUserAction('01', { log: true })
    // { type: 'FETCH_USER', payload: '01', meta: { debug: false, log: false, _toolbeltAsyncFnArgs: ['user_01', {log: true}] } }
    
    ``` 
  * `argsMapper` - Defaults to `const trivialArgsMapper = (payload, meta) => ({ payload, meta })`
    
    Same as the `argsMapper` argument described above. The argument takes priority over the option.
### Returns
An action creator that when called and dispatched:
 
* An action with the type of `baseName` and `payload` and `meta` that are based on the arguments of the call is dispatched.
* The `asyncFn` is called and expected to return a promise.

When the promise that is returned from `asyncFn` resolves or rejects:

* Upon a resolve, the `success` sub-action is dispatched with the `result` of the promise.
* Upon a reject, the `failure` sub-action is dispatched with the `error` of the promise.

### _toolbeltAsyncFnArgs
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
  defaultMeta: { log: true },
  argsMapper: (...args) => ({ payload: args })
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

console.log(fetchUser.success({ id: 'user00' }))
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
