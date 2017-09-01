# Redux-Toolbelt

A set of tools for quicker, easier, less verbose and safer redux development by [welldone-software](http://welldone-software.com).  
Written in ES6.

<p align="center">
  <img align="center" src="https://raw.githubusercontent.com/welldone-software/redux-toolbelt/master/redux-toolbelt-logo.png" alt="redux-toolbelt logo"/>
</p>

## TOC

<!-- toc -->

- [Installation](#installation)
- [Usage](#usage)
- [API Reference](#api-reference)
  * [`composeReducers()`](#composereducers)
    + [Default State](#default-state)
  * [`makeActionCreator()`](#makeactioncreator)
    + [Adding payload and metadata to actions](#adding-payload-and-metadata-to-actions)
    + [Actions Prefixes](#actions-prefixes)
  * [`makeAsyncActionCreator()`](#makeasyncactioncreator)
  * [`makeAsyncReducer()`](#makeasyncreducer)
    + [Reducer Behvaiour](#reducer-behvaiour)
      - [Initialization](#initialization)
      - [Request](#request)
      - [Progress](#progress)
      - [Success](#success)
      - [Failure](#failure)

<!-- tocstop -->

## Installation
The tools are available in the `redux-toolbelt` npm package.
```sh
npm install --save redux-toolbelt

# or

yarn add redux-toolbelt
```

## Usage
import the functions you like to use using one of the two methods:
```js
import {composeReducers, makeActionCreator} from 'redux-toolbelt'

// or

import composeReducers from 'redux-toolbelt/lib/composeReducers'
import makeActionCreator from 'redux-toolbelt/lib/makeActionCreator'

```

## Demo
A demo project can be found here:

https://github.com/welldone-software/redux-toolbelt-demo

The demo can be run in a live sandbox environment here:

https://codesandbox.io/s/github/welldone-software/redux-toolbelt-demo

## API Reference

### `composeReducers()`
This function in a replacement for redux's `combineReducers`.  
The function excepts multiple reducers as arguments and executes them one after the other.  
If in argument is a reducers map instead of a reducer (like in `composeReducers`) we create a reducer from that map in the same fashion.
```js
const mainReducer = (state, action) => {...} // returns { todos: [...] }
const sideEffectReducer = (state, action) => {...} // return { count: 0 }
const currentActionReducer = (state, action) => {...} // return 'dragging'
const userNameReducer = (state, action) => {...} // return 'welldone'

// reducer will return
// {
//   todos: [...],
//   count: 3,
//   currentAction: 'dragging',
//   userName: 'welldone'  
// }
const reducer = composeReducers(
  mainReducer,
  sideEffectReducer,
  {
    currentAction: currentActionReducer,
    userName: userNameReducer
  }
)
```

#### Default State
As a result of the reducers run one after the other, only the first one will get an `undefined` state on the first run.  
Nested reducers will get `undefined` if none was supplied in the root state:
```js
const DEFAULT_STATE = {val: 1}
const IGNORED = {anotherVal: 2}
const NESTED_DEFAULT_STATE = 5

const mainReducer = (state = DEFAULT_STATE, action) => {...}
const anotherReducer = (state = IGNORED_STATE, action) => {...}
const nestedReducer = (state = NESTED_DEFAULT_STATE, action) => {...} // will get NESTED_DEFAULT_STATE on first run (or what mainReducer returns)

const reducer = composeReducers(
  mainReducer, // will get DEFAULT_STATE on first run
  anotherReducer, // will get DEFAULT_STATE on first run (or what mainReducer returns)
  {
    nestedVal: nestedReducer // will get NESTED_DEFAULT_STATE on first run
  }
)
```

### `makeActionCreator()`
Create an FSA complient action creator that exposes its `TYPE` as static member.  
This can help force type-safty without adding alot of verbose code and constants.  

All produced actions will have a `type`, `payload` and `meta` properties.
```js
const myAction = makeActionCreator('MY_ACTION')

// Usage in reducer
const myReducer = (state, action) => {
  switch (action.type) {
    case myAction.TYPE:
      // ... responding to action
      return newState
    default:
      return state
  }
}
```

#### Adding payload and metadata to actions
The actions creators excepts `payload` and `meta` as argument by default.
```js
myAction({val: 5}, {debug: true})
// ==> {
//   {
//     type: 'MY_ACTION',
//     payload: {val: 5},
//     meta: {debug: true}
//   }
// }
```

To customize the action creators the make them more clear you can use the second parameter `argMapper`.
```js
const myAction = makeActionCreator('MY_ACTION', (val, debug=false) => ({
  payload: {val},
  meta: {debug}
}))

myAction(5, true)
// ==> {
//   {
//     type: 'MY_ACTION',
//     payload: {val: 5},
//     meta: {debug: true}
//   }
// }
```

#### Actions Defaults
There are situations where you want to creates actions that has logical relations with each other with a prefix, or a common default metadata.
You can do it like so:
```js
const makeCounterAction = makeActionCreator.withDefaults({
  prefix: "COUNTER/",
  defaultMeta: {log: true}
})

const increase = makeCounterAction('INCREASE')
const decrease = makeCounterAction('DECREASE')

increase()
// ==> { type: 'COUNTER/INCREASE', meta: {log: true} }

decrease()
// ==> { type: 'COUNTER/DECREASE', meta: {log: true} }
```

### `makeReducer()`
Creates a reducer that handles action created with `makeActionCreator()`.

The second parameter is the handler of the specified action.

If it is not supplied, the reducer will always return the payload of the action.

The last parameter (second or third) is options.

It can only have one option right now: `defaultState` that specifies the initial state. It is `null` by default.

```
const toggle = makeActionCreator('TOGGLE')

const visibilityState = makeReducer(toggleActionCreatora, visible => !visible, {defaultState: true})

const state1 = reducer(undefined, {TYPE: '@@redux/INIT'})
// state1 === true

const state2 = reducer(state1, toggle())
// state2 === false

const state2 = reducer(state1, toggle())
// state2 === true
```

It is very useful with `composeReducers`:
```
const setUserName = makeActionCreator('SET_USER_NAME')
const toggleShow = makeActionCreator('TOGGLE_SHOW')

const reducer = composeReducers({
  userName: makeReducer(setUserName),
  show: makeReducer(toggleShow, state => !state, {defaultState: true}),
})

const initialState = reducer(undefined, {type: '@@redux/INIT'})
// initialState ==> {
//   userName: null,
//   show: true,
// }

const state1 = reducer(initialState, setUserName('test-user-name'))
// state1 ==> {
//   userName: 'test-user-name',
//   show: true,
// }

const state2 = reducer(state1, toggleShow())
// state2 ==> {
//   userName: 'test-user-name',
//   show: false,
// }
```

### `makeAsyncActionCreator()`
Wrapper around `makeActionCreator()`, to help create multiple actions creators for usage in async/side effects middlewares like `redux-thunk`, `redux-saga` or `redux-observable`.
```js
const fetchTodos = makeAsyncActionCreator('FETCH_TODOS')

// Dispatching
fetchTodos()
// ==> { type: 'FETCH_TODOS@ASYNC_REQUEST' }

fetchTodos.success()
// ==> { type: 'FETCH_TODOS@ASYNC_SUCCESS' }

fetchTodos.failure()
// ==> { type: 'FETCH_TODOS@ASYNC_FAILURE' }

fetchTodos.progress()
// ==> { type: 'FETCH_TODOS@ASYNC_PROGRESS' }

fetchTodos.cancel()
// ==> { type: 'FETCH_TODOS@ASYNC_CANCEL' }

// inside reducers
// Usage in reducer
const myReducer = (state, action) => {
  switch (action.type) {
    case fetchTodos.TYPE:
      // ... responding to request start
      return newState
      
    case fetchTodos.success.TYPE:
      // ... responding to a successful request
      return newState
      
    case fetchTodos.failure.TYPE:
      // ... responding to a failed request
      return newState
      
    case fetchTodos.progress.TYPE:
      // ... responding to progress indications
      return newState
      
    case fetchTodos.cancel.TYPE:
      // ... responding to request cancellation
      return newState
      
    default:
      return state
  }
}
```

### `makeAsyncReducer()`
Creates a reducer that handles action created with `makeAsyncActionCreator()`.
Behavior can be defined in an options object passed as the 2nd arg:

```js
const asyncAction = makeAsyncActionCreator('ASYNC_ACTION')

// These are the default options
const options = {
  dataProp: 'data',
  shouldDestroyData: true,
  defaultData: undefined,
  shouldSpread: false,
  shouldSetData: true
}

const asyncReducer = makeAsyncReducer(asyncAction, options)
```

#### Reducer Behvaiour

Reducers created with `makeAsyncReducer()` respond to the request, progree, success and failure actions.

##### Initialization
On start, the reducer will return the following state by default:
```js
const asyncReducer = makeAsyncReducer(asyncAction)

const state = undefined
asyncReducer(state, {type: '@@INIT'})
// ==> {
//   loading: false,
//   data: undefined
// }
```

You can customize the `data` field name or default value.
```js
const asyncReducer = makeAsyncReducer(asyncAction, {
  dataProp: 'results',
  defaultData: []
})

const state = undefined
asyncReducer(state, {type: '@@INIT'})
// ==> {
//   loading: false,
//   results: []
// }
```

You can remove the use of the `dataProp`.
```js
const asyncReducer = makeAsyncReducer(asyncAction, {
  shouldSpread: true,
  defaultData: {
    counter: 0,
    status: 'offline'
  }
})

const state = undefined
asyncReducer(state, {type: '@@INIT'})
// ==> {
//   loading: false,
//   counter: 0,
//   status: 'offline'
// }
```

##### Request
When the reducer gets the `request` action it updates the `loading` field.
```js
const asyncReducer = makeAsyncReducer(asyncAction)

const state = {loading: false, data: [1, 2, 3]}
asyncReducer(state, asyncAction())
// ==> {
//   loading: true,
//   data: [1, 2, 3]
// }
```

You can also configure the reducer to destory the current results.
```js
const asyncReducer = makeAsyncReducer(asyncAction, {
  shouldDestroyData: true,
  defaultData: []
})

const state = {loading: false, data: [1, 2, 3]}
asyncReducer(state, asyncAction())
// ==> {
//   loading: true,
//   data: []
// }
```

##### Progress
When the reducer gets the `progress` action is updates the `progress` field with the action's payload.

```js
const asyncReducer = makeAsyncReducer(asyncAction)

const state = {loading: true}
asyncReducer(state, asyncAction.progress(5))
// ==> {
//   loading: true,
//   progress: 5
// }
```

##### Success
When the reducer gets the `success` action is updates the `loading` to `true` and sets the `dataProp` field with the action's payload.

```js
const asyncReducer = makeAsyncReducer(asyncAction)
const state = {loading: true}
asyncReducer(state, asyncAction.success([1, 2, 3]))
// ==> {
//   loading: false,
//   'data': [1, 2, 3]
// }
```

If the data isn't needed you can remove it from the state completely.  
In this way you only detect requests success and failure.
```js
const asyncReducer = makeAsyncReducer(asyncAction, {
  shouldSetData: false
})

const state = {loading: true}
asyncReducer(state, asyncAction.success([1, 2, 3]))
// ==> {
//   loading: false
// }
```

##### Failure
When the reducer gets the `failure` action is updates the `loading` to `false` and the `error` field with the action's payload.

```js
const asyncReducer = makeAsyncReducer(asyncAction)

const state = {loading: true}
asyncReducer(state, asyncAction.failure(`Server unreachable`))
// ==> {
//   loading: false,
//   error: 'Server unreachable'
// }
```
