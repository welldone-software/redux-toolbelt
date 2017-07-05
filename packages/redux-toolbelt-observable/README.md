# Redux-Toolbelt-Observable

A set of helper functions that extends 'redux-toolbelt' for usage with `redux-observable`.

## TOC

<!-- toc -->

- [Installation](#installation)
- [Usage](#usage)
- [API Reference](#api-reference)
  * [`makeAsyncEpic()`](#makeasyncepic)

<!-- tocstop -->

## Installation
The tools are available in the `redux-toolbelt` npm package.
```sh
npm install --save redux-toolbelt redux-toolbelt-observable rxjs redux-observable

# or

yarn add redux-toolbelt redux-toolbelt-observable rxjs redux-observable
```

## Usage
import the functions you like to use using one of the two methods:
```js
import {makeAsyncActionCreator} from 'redux-toolbelt'
import {makeAsyncEpic} from 'redux-toolbelt-observable'

// or

import makeAsyncActionCreator from 'redux-toolbelt/lib/makeAsyncActionCreator'
import makeAsyncEpic from 'redux-toolbelt-observable/lib/makeAsyncEpic'

```

## API Reference

### `makeAsyncEpic()`
Creates an epic that handles actions created `makeAsyncActionCreator`.  
The epic listens to the `request` action and dispatches `success` and `failure` actions.
```js
const fetchTodos = makeAsyncActionCreator('FETCH_TODOS')

// Returns promise or observable
const fetchTodosFromServer = () => {/*...*/}

const epic = makeAsyncEpic(fetchTodos, fetchTodosFromServer)
```
