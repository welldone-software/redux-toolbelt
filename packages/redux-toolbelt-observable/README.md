# Redux-Toolbelt-Observable

A set of helper functions that extends 'redux-toolbelt' for usage with `redux-observable`.

<p align="center">
  <img align="center" src="https://raw.githubusercontent.com/welldone-software/redux-toolbelt/master/redux-toolbelt-logo.png" alt="redux-toolbelt logo"/>
</p>

## TOC

<!-- toc -->

- [Installation](#installation)
- [Usage](#usage)
- [API Reference](#api-reference)
  - [`makeAsyncEpic(asyncActionCreator, asyncFn, options?)`](#makeasyncepic)
  - [`makeSuffixesEpic(mapper, suffixes, metaPredicate?)`](#makeSuffixesEpic)
  - [`makeGlobalErrorEpic(mapper)`](#makeGlobalErrorEpic)

<!-- tocstop -->

## Article

[Read about `redux-toolbelt` here](https://medium.com/welldone-software/redux-toolbelt-supercharge-your-redux-ec16e704fe93)

## Installation

The tools are available in the [`redux-toolbelt-observable`](https://www.npmjs.com/package/redux-toolbelt-observable) npm package.

```sh
npm install --save redux-toolbelt redux-toolbelt-observable rxjs redux-observable

# or

yarn add redux-toolbelt redux-toolbelt-observable rxjs redux-observable
```

## Usage

You may import the functions you'd like to use using one of the two methods:

```js
import { makeAsyncActionCreator } from 'redux-toolbelt';
import { makeAsyncEpic } from 'redux-toolbelt-observable';

// or

import makeAsyncActionCreator from 'redux-toolbelt/lib/makeAsyncActionCreator';
import makeAsyncEpic from 'redux-toolbelt-observable/lib/makeAsyncEpic';
```

## API Reference

### `makeAsyncEpic`

`makeAsyncEpic(asyncActionCreator, asyncFn, options?)`

Creates an epic that handles actions created `makeAsyncActionCreator`.  
The epic listens to the `request` action and dispatches `success` and `failure` actions.

#### Example

```js
const fetchTodos = makeAsyncActionCreator('FETCH_TODOS');

const fetchTodosFromServer = () => {
  return axio.get('api/v1/todos');
};

const epic = makeAsyncEpic(fetchTodos, fetchTodosFromServer);
```

### Arguments

#### `asyncActionCreator`

An async action creator created by `makeAsyncActionCreator`.

#### `asyncFn`

The async request to be executed. The function accepts the action's `payload`, `type`, `meta` and the store's `state$` as parametes.
It can return either an `Object`, a `Promise` or an `Observable`.

```js
const fetchTodosAsyncFn = payload => {
  return axio.get(`api/v1/todos/${payload.id}`);
};

const createOrUpdateTodoAsyncFn = (payload, type, meta, state$) => {
  const isNew = !state$.value.todos.find(t => t.id === payload.id);
  return isEdit
    ? axio.put(`api/v1/todos/${payload.id}`, { data: payload })
    : axio.post(`api/v1/todos`, { data: payload });
};

const callMultipleApisAsyncFn = async () => {
  const first = await axios.get('api/v1/first');
  const second = await axios.get('api/v1/second');
  return { first, second };
};
```

> Note: The reason for the `asyncFn` signature to break down the action into its pars `payload`, `type`, `meta` as opposed to accepting a single `action` parameter is to simplify a very common scenario where the following mapping is used:
>
> ```js
> const epic = makeAsyncEpic(actions.updateTodo, api.updateTodo);
> actions.updateTodo({ id: 5, text: 'todo 5' });
> ```
>
> Had the signature of the `asyncFn` would have been `(action, state$)` you would have had to change the epic to:
>
> ```js
> // WRONG - do not do this
> const epic = makeAsyncEpic(actions.updateTodo, action =>
>   api.updateTodo(action.paylod)
> );
> ```
>
> and repeat it again and again.

#### `options`

`ignoreOlderParallelResolves (deprecating: cancelPreviousFunctionCalls)`

If several promises are made before any of them resolves,
you can choose to ignore older resolves and only receive the last one by passing true to this option

```js
const fetchTodos = makeAsyncActionCreator('FETCH_TODOS');

const fetchTodosFromServer = payload => {
  /*...*/
};

const epic = makeAsyncEpic(fetchTodos, fetchTodosFromServer, {
  ignoreOlderParallelResolves: true
});
```

### `Payload and Meta`

You can pass parameters within the ActionCreator like this:

```js
const fetchTodos = makeAsyncActionCreator('FETCH_TODOS');

const fetchTodosFromServer = payload => {
  /*...*/
};

const epic = makeAsyncEpic(fetchTodos, fetchTodosFromServer);

fetchTodos(payload, meta);
```

After the request has returned successfully, the meta object contains the original meta and an object name `_toolbeltAsyncFnArgs` with the payload that was sent. For example:

```js
// actions.js
const fetchAddFive = makeAsyncActionCreator('FETCH_ADD_FIVE')

// api.js
const fetchAddFiveFromServer = ({number}) => Promise.resolve(number + 5)

// epics.js
const epic = makeAsyncEpic(fetchAddFive, fetchAddFiveFromServer)

// execute action
fetchAddFive({number: 1}, {a: true})

// on request
{TYPE: 'FETCH_ADD_FIVE@ASYNC_REQUEST', payload: {number: 1}, meta: {a: true}}

// on success
{TYPE: 'FETCH_ADD_FIVE@ASYNC_SUCCESS', payload: 6, meta: {a: true, _toolbeltAsyncFnArgs: {number: 1}}}
```

This ability makes sure you use the most updated response.

### `makeSuffixesEpic`

`makeSuffixesEpic(mapper, suffixes, metaPredicate?)`

```js
export const errorInAsyncRequests = makePrefixesEpic(
  ({ payload }, _) => {
    if (payload.status === 401 || payload.status === 403) {
      return actions.reset();
    }
    return showSnack(
      payload?.error.message || payload.message || 'Unknown error'
    );
  },
  ACTION_ASYNC_FAILURE_SUFFIX,
  meta => meta.shouldIgnoreGlobalError
);
```

### `makeGlobalErrorEpic`

`makeGlobalErrorEpic(mapper)`

Creates an epic that handles `failure` actions created by calls to `makeAsyncActionCreator`.  
The helper epic listens to the all `failure` actions dispatched in the application and allows you to handler them centrally, in one place.
A common usage of this epic is to show error messages/notifications/toast in a common way and controlled in a single place in the code.

```js
export const errorInAsyncRequests = makeGlobalErrorEpic(
  ({ payload }) => ({ payload }, _) => {
    if (payload.status === 401 || payload.status === 403) {
      return actions.reset();
    }
    return showSnack(
      payload?.error.message || payload.message || 'Unknown error'
    );
  }
);
```
