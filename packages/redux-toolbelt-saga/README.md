# redux-toolbelt-saga

A set of helper functions that extends 'redux-toolbelt' for usage with `redux-saga`.

<p align="center">
  <img align="center" src="https://raw.githubusercontent.com/welldone-software/redux-toolbelt/master/redux-toolbelt-logo.png" alt="redux-toolbelt logo"/>
</p>

## TOC

<!-- toc -->

- [Installation](#installation)
- [Usage](#usage)
- [API Reference](#api-reference)
  * [`makeAsyncSaga()`](#makeasyncsaga)

<!-- tocstop -->

## Installation
The tools are available in the `redux-toolbelt` npm package.
```sh
npm install --save redux-toolbelt redux-toolbelt-saga redux-saga

# or

yarn add redux-toolbelt redux-toolbelt-saga redux-saga
```

## Usage
import the functions you like to use using one of the two methods:
```js
import {makeAsyncActionCreator} from 'redux-toolbelt'
import {makeAsyncSaga} from 'redux-toolbelt-saga'

// or

import makeAsyncActionCreator from 'redux-toolbelt/lib/makeAsyncActionCreator'
import makeAsyncSaga from 'redux-toolbelt-saga/lib/makeAsyncSaga'

```

## API Reference

### `makeAsyncSaga()`
Creates a saga that handles actions created using `makeAsyncActionCreator`.  

The first argument specifies saga when to dispatch the function in the second argument.

```js
const fetchTodos = makeAsyncActionCreator('FETCH_TODOS')

// Returns promise
const fetchTodosFromServer = ({id, url}, debug = false) => {/*...*/}

const saga = makeAsyncSaga(fetchTodos, fetchTodosFromServer)

//...
dispatch(fetchTodos({id: 100, url: 'http://google.com'}))
```

By default, the payload of the action is what passed to the function as it's argument.

You have two ways of changing it, using `options`:

```js
const options = {
  // pass specific arguments
  args: [{id, url}],
  
  // OR
  
  // map the action to arguments using a regular or a generator function
  mapArgs: function* mapArgs(action){
    const {todosId} = action.payload
    const url = yield select(urlSelector)
    
    return [{id: todosId, url}, true]
  }
}

const saga = makeAsyncSaga(fetchTodos, fetchTodosFromServer, options)
```
