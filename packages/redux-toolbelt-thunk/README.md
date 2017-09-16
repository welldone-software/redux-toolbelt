# redux-toolbelt-saga

A set of helper functions that extends 'redux-toolbelt' for usage with `redux-thunk`.

<p align="center">
  <img align="center" src="https://raw.githubusercontent.com/welldone-software/redux-toolbelt/master/redux-toolbelt-logo.png" alt="redux-toolbelt logo"/>
</p>

## TOC

<!-- toc -->

- [Installation](#installation)
- [Usage](#usage)
- [API Reference](#api-reference)
  * [`makeAsyncThunkActionCreator(baseName, asyncFn [, options])`](#makeasyncthunkactioncreatorbasename-asyncfn--options)

<!-- tocstop -->

## Installation
The tools are available in the `redux-toolbelt` npm package.
```sh
npm install --save redux-toolbelt redux-toolbelt-thunk redux-thunk

# or

yarn add redux-toolbelt redux-toolbelt-saga redux-thunk
```

## Usage
import the functions you like to use using one of the two methods:
```js
import {makeAsyncThunkActionCreator} from 'redux-toolbelt-thunk'

// or

import makeAsyncThunkActionCreator from 'redux-toolbelt/lib/makeAsyncThunkActionCreator'

```

## API Reference

### `makeAsyncThunkActionCreator(baseName, asyncFn [, options])`
Creates a an action similar to `makeAsyncActionCreator`, with `TYPE` static member and both `success` 
and `failure` sub actions. 

The first argument specifies the base name of the action.

The second argument, `asyncFn` is the async function to run.

The optional third argument is an options object for advanced scenarios.

```js
// Returns promise
const fetchTodosFromServer = (filter) => {/*...*/}

export const fetchTodos = makeAsyncThunkActionCreator('FETCH_TODOS', filter => fetchTodosFromServer(filter))

// later in your code

dispatch(fetchTodos('My todos'))
  .then(...) // optional
  .catch(...) // optional
```

Once the `fetchTodos` is called, it dispatches a `FETCH_TODOS@LOADING` action, then executes the  `asyncFn` function 
given to it and dispatches a `FETCH_TODOS@SUCCESS` with the data retrieved from the server as its payload.
In case of failure, `FETCH_TODOS@FAILURE` will be dispatched with the `Error` object as the payload.

To take full advantage fo it, one can use `makeAsyncReducer` from `redux-toolbelt` to automaticaly create a reducer that 
is fully aware of the conventions:

```js
import {makeAsyncReducer} from 'redux-toolbelt'
import {fetchTodos} from './actions'

export const todos = makeAsyncReducer(fetchTodos) 

```

With the following two lines of code:

```js
// actions.js
export const fetchTodos = makeAsyncThunkActionCreator('FETCH_TODOS', filter => fetchTodosFromServer(filter))

// reducers.js
export const todos = makeAsyncReducer(fetchTodos) 
```

We have created all that is needed to publish and handle all actions and state management for the retrival of todos from 
the server. In Vanila Redux, this would have taken you at least *15 lines of code*  (3 constants, 3 actions with a long 
thunk and a reducer with 3 case sections and a default).
