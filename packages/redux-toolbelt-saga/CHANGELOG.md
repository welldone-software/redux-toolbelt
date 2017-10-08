## v1.1.0 (2017-10-08)

### Breaking Change
Previously, when `makeAsyncSaga` was created it specified the arguments it will pass to the function it wraps:
```js
// this ** IS NOT! ** how it works now
const saga = makeAsyncSaga(fetchTodosAction, fetchTodosFromServer, arg1, arg2, ...)
```
- Now, the default arguments passed to the function will be the action's payload.

- Now, the only valid argument after the first two is `options`,
and it includes two ways of mapping the arguments that are passed to the promise: `args` or `mapArgs`.

```js
// this IS how it works now
const saga = makeAsyncSaga(fetchTodosAction, fetchTodosFromServer, {
  args: [arg1, arg2],
  //OR
  mapArgs: function* (action){
    const state = yield select()
    return [action.payload.arg1, state.arg2]
  },
})
```

## v1.0.10

Stable version
