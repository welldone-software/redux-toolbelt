# Redux-Toolbelt

A set of tools for quicker, easier, less verbose and safer Redux development by [welldone-software](http://welldone-software.com).  
Written in ES6.

<p align="center">
  <img align="center" src="https://raw.githubusercontent.com/welldone-software/redux-toolbelt/master/redux-toolbelt-logo.png" alt="redux-toolbelt logo"/>
</p>

## TOC

<!-- toc -->

- [Installation](#installation)
- [Usage](#usage)
- [Demo](#demo)
- [API Reference](#api-reference)
  * [`makeActionCreator()`](#makeactioncreator)
    + [Adding payload and metadata to actions](#adding-payload-and-metadata-to-actions)
    + [Actions Defaults](#actions-defaults)
  * [`makeReducer()`](#makereducer)
  * [`makeAsyncActionCreator()`](#makeasyncactioncreator)
  * [`makeAsyncReducer()`](#makeasyncreducer)
    + [Reducer Behavior](#reducer-behavior)
      - [Initialization](#initialization)
      - [Request](#request)
      - [Progress](#progress)
      - [Success](#success)
      - [Failure](#failure)
  * [`composeReducers()`](#composereducers)
    + [Default State](#default-state)
  * [`isActionCreator()`](#isactioncreator)

<!-- tocstop -->

## Installation

The tools are available in the [`redux-toolbelt`](https://www.npmjs.com/package/redux-toolbelt) npm package.

```sh
npm install --save redux-toolbelt

# or

yarn add redux-toolbelt
```

## Usage

Import the functions you need using one of these two methods:

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

### `makeActionCreator()`

Creates an [FSA](https://github.com/redux-utilities/flux-standard-action) compliant action creator that exposes its `TYPE` as a static member.  
This can help force type-safety without adding a lot of verbose code and constants.

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

The action creators accept `payload` and `meta` arguments by default.

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

To customize the action creators and better tailor them to your needs you can use the second parameter `argMapper`.

```js
const myAction = makeActionCreator('MY_ACTION', (val, debug = false) => ({
  payload: {val},
  meta: {debug},
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

The `argMapper` function will receive the arguments passed to the action creator and return an object that will be merged along the action type to make the actual Redux action. The arguments are usually the values for the `payload` and `meta` properties, but they might be whatever is needed.

#### Actions Defaults

There are situations where you want to create actions that have logical relations with each other with a prefix, or a common default metadata.
You can do it like so:

```js
const makeCounterAction = makeActionCreator.withDefaults({
  prefix: 'COUNTER/',
  defaultMeta: {log: true},
})

const increase = makeCounterAction('INCREASE')
const decrease = makeCounterAction('DECREASE')

increase()
// ==> {type: 'COUNTER/INCREASE', meta: {log: true}}

decrease()
// ==> {type: 'COUNTER/DECREASE', meta: {log: true}}
```

### `makeReducer()`

Creates a reducer that handles action creator[s] created with `makeActionCreator` or follow its conventions ([FSA](https://github.com/redux-utilities/flux-standard-action) compliance plus action type naming convention).

* The first argument is `actionCreator[s]` and it can be one of the following:

  * `actionCreator`

    ```
    const toggleAction = makeActionCreator('TOGGLE')
    const toggleReducer = makeReducer(
      toggleAction,
      state => !state, {defaultState: false}
    )
    ```

  * An array of `actionCreator`'s:
    ```
    const countUpdatedReducer = makeReducer(
      [increaseBy, decreaseBy],
      (state, {payload}) => (state || (payload !== 0)),
      {defaultState: false}
    )
    ```
  * An object of `actionCreator`'s

    _note: You can pass action creators as the keys to the action creator's object because action creators have the `toString` method defined to return its own action creator type_

    ```
    const reducer = makeReducer({
      [increaseBy]: (state, {payload}) => state + payload,
      [decreaseBy.TYPE]: (state, {payload}) => state - payload,
    }, {defaultState: 100})
    ```

* The second argument is the `handler` for the specified action.
  * If not specified, the reducer will update the state to
    the payload of the action whenever it is fired.
* The last argument is an optional `options` object. The only option currently supported is:
  * `defaultState`: Specifies the initial state. It is `null` by default.

```
const toggle = makeActionCreator('TOGGLE')

const visibilityState = makeReducer(
  toggle,
  visible => !visible,
  {defaultState: true}
)

let state = reducer(undefined, {TYPE: '@@redux/INIT'})
// state === true
// The '@@redux/INIT' action type is dispatched by Redux itself
// upon initialization

state = reducer(state, toggle())
// state === false

state = reducer(state, toggle())
// state === true
```

Passing multiple action creators as the first argument:

```
const increaseBy = makeActionCreator('INCREASE_BY')
const decreaseBy = makeActionCreator('DECREASE_BY')

const countUpdatedReducer = makeReducer(
  [increaseBy, decreaseBy],
  (state, {payload}) => (state || (payload !== 0)),
  {defaultState: false}
})

let state = countUpdatedReducer(undefined, {type: '@@redux/INIT'})
// state === false

state = countUpdatedReducer(state, increaseBy(0))
// state === false

state = countUpdatedReducer(state, decreaseBy(20))
// state === true

state = countUpdatedReducer(state, increaseBy(20))
// state === true
```

Using an actions object:

```
const increaseBy = makeActionCreator('INCREASE_BY')
const decreaseBy = makeActionCreator('DECREASE_BY')

// notice how passing an action creator is equivalent
// to passing the action creator's type.

const reducer = makeReducer(
  {
    [increaseBy]: (state, {payload}) => state + payload,
    [decreaseBy.TYPE]: (state, {payload}) => state - payload,
  },
  {defaultState: 100}
)

let state = reducer(undefined, {type: '@@redux/INIT'})
// state === 100

state = reducer(state, increaseBy(10))
// state === 110

state = reducer(state, decreaseBy(20))
// state === 90
```

It is very useful with [`composeReducers`](#composereducers):

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

const state3 = reducer(state2, toggleShow())
// state3 ==> {
//   userName: 'test-user-name',
//   show: false,
// }
```

### `makeAsyncActionCreator()`

Wrapper around `makeActionCreator()`, to help create actions creators for usage in async/side effects middleware like `redux-thunk`, `redux-saga` or `redux-observable`. In practice, it is more convenient to use the specific action creators for each type of middleware:

* [makeThunkAsyncActionCreator](../redux-toolbelt-thunk) for `redux-thunk`
* [makeAsyncSaga](../redux-toolbelt-saga) for `redux-saga`
* [makeAsyncEpic](../redux-toolbelt-observable) for `redux-observable`

```js
const fetchTodos = makeAsyncActionCreator('FETCH_TODOS')

// Dispatching
fetchTodos()
// ==> {type: 'FETCH_TODOS@ASYNC_REQUEST'}

fetchTodos.success()
// ==> {type: 'FETCH_TODOS@ASYNC_SUCCESS'}

fetchTodos.failure()
// ==> {type: 'FETCH_TODOS@ASYNC_FAILURE'}

fetchTodos.progress()
// ==> {type: 'FETCH_TODOS@ASYNC_PROGRESS'}

fetchTodos.cancel()
// ==> {type: 'FETCH_TODOS@ASYNC_CANCEL'}

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

Creates a reducer that handles actions created with `makeAsyncActionCreator()` or any of its middleware-specific implementations.
Its behavior can be defined in an options object passed as the 2nd argument:

```js
const asyncAction = makeAsyncActionCreator('ASYNC_ACTION')

// These are the default options
const options = {
  dataProp: 'data',
  shouldDestroyData: true,
  shouldDestroyDataOnError: true,
  shouldSetError: true,
  defaultData: undefined,
  shouldSpread: false,
  shouldSetData: true,
  dataGetter: undefined,
}

const asyncReducer = makeAsyncReducer(asyncAction, options)
```

#### Reducer Behavior

Reducers created with `makeAsyncReducer()` respond to the request, progress, success and failure actions.

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
  defaultData: [],
})

const state = undefined
asyncReducer(state, {type: '@@INIT'})
// ==> {
//   loading: false,
//   results: []
// }
```

You can customize the `data` field value that is assigned during the success reducer using the `dataGetter` option.

By default, the reducer will simply set the data to the action `payload`.
The `dataGetter` function receives the current data and `action` and should return the new data. This allows you to add items, remove and do whatever you
need. As per Redux own rules, the data should be immutable and `redux-toolbelt` provides plenty of [immutable helpers](../redux-toolbelt-immutable-helpers) to assist with that.

```js
const asyncReducer = makeAsyncReducer(asyncAction, {
  dataGetter: ({data}, {payload}) => [...data, payload],
})

const state = {data: ['a']}
asyncReducer(state, asyncAction.success('b'))
// ==> {
//   loading: false,
//   data: ['a', 'b']
// }
```

You may spread the payload instead of saving it under `data` or the field name given in the `dataProp` option.

```js
const asyncReducer = makeAsyncReducer(asyncAction, {
  shouldSpread: true,
  defaultData: {
    counter: 0,
    status: 'offline',
  },
})

const state = undefined
asyncReducer(state, {type: '@@INIT'})
// ==> {
//   loading: false,
//   counter: 0,
//   status: 'offline'
// }
```

> Please note however that we do not recommend the use of `shouldSpread`. We have gained a lot from using the `data` member.
> The separation of the state into _maintenance_ information and _actual_ `data`, as well as adhering to such naming convention proves invaluable in terms of readability and consistency and highly increases the number of opportunities for logic reuse especially by making it clearer and easier to apply logic on state generically.

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

You can also configure the reducer to ignore the action payload and return the data to its default value.

```js
const asyncReducer = makeAsyncReducer(asyncAction, {
  shouldDestroyData: true,
  defaultData: [],
})

const state = {loading: false, data: [1, 2, 3]}
asyncReducer(state, asyncAction())
// ==> {
//   loading: true,
//   data: []
// }
```

##### Progress

When the reducer gets the `progress` action it updates the `progress` field with the action's payload.

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

When the reducer gets the `success` action it updates `loading` to `false` and, by default, sets the `dataProp` field to the action's payload. If the `dataGetter` option is set, it will call it and set it to whatever it returns.

```js
const asyncReducer = makeAsyncReducer(asyncAction)
const state = {loading: true}
asyncReducer(state, asyncAction.success([1, 2, 3]))
// ==> {
//   loading: false,
//   'data': [1, 2, 3]
// }
```

If the data isn't actually needed you can remove it from the state completely.  
In this way you only detect the loading status and the success or failure of the request.

```js
const asyncReducer = makeAsyncReducer(asyncAction, {
  shouldSetData: false,
})

const state = {loading: true}
asyncReducer(state, asyncAction.success([1, 2, 3]))
// ==> {
//   loading: false
// }
```

##### Failure

When the reducer gets the `failure` action it updates `loading` to `false` and the `error` field with the action's payload.

```js
const asyncReducer = makeAsyncReducer(asyncAction)

const state = {loading: true}
asyncReducer(state, asyncAction.failure(`Server unreachable`))
// ==> {
//   loading: false,
//   error: 'Server unreachable'
// }
```

The `shouldDestroyDataOnError` option sets the data to an empty object since it is presumably no longer valid on reception of an error. It defaults to true.

The `shouldSetError` option assumes the payload contains the error object according to the [FSA spec](https://github.com/redux-utilities/flux-standard-action#payload) and assigns it to the `error` property. It defaults to true.

### `composeReducers()`

This function is a replacement for Redux's `combineReducers`.  
The function accepts multiple reducers as arguments and executes them sequentially.

If in argument is a reducers map instead of a reducer (like in `composeReducers`) it will create a reducer from that map in the same fashion.

```js
const mainReducer = (state, action) => {...} // returns {todos: [...]}
const sideEffectReducer = (state, action) => {...} // return {count: 0}
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

As a result of the reducers being run one after the other, only the first one will get an `undefined` state on the first run.  
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

### `isActionCreator()`

A utility to determine if an object is an action creator:

```
const a = makeActionCreator('A')
//isActionCreator(a) === true

const b = makeAsyncActionCreator('B')
// isActionCreator(b) === true
// isActionCreator(b.success) === true
// isActionCreator(b.failure) === true
// isActionCreator(b.progress) === true
// isActionCreator(b.cancel) === true

// isActionCreator({}) === false
// isActionCreator(true) === false
// isActionCreator(() => {}) === false
// isActionCreator([]) === false
```
