# redux-toolbelt

A set of tools for quicker, easier and safer redux development by [welldone-software](http://welldone-software.com).



## Enhanced action creators

<!--
### `makeActionCreator(name: string, options?: {prefix: string, defaultMeta: object}) : (payload?: any, meta?: any) => {type: string, payload?: any, meta?: any}`)
-->

### `makeActionCreator(name [,argsMapper, options])`

Create an FSA complient action creator that exposes its `TYPE` as static member, forcing 'type' safty without the hassle and verbosity of using constants.

```
  const a = makeActionCreator('A')

  expect(a.TYPE).toBe('A')

  expect(a().type).toBe('A')

  expect(a()).toEqual({type: 'A', payload: undefined, meta: undefined})

```

Usually, to be usefull, an action creator accepts arguments. Action creators created with `makeActionCreator` fully support passing arguments.
At its simplest form, `makeActionCreator` produces action creators that accept two arguments, `payload` and `meta`.

```
  const a = makeActionCreator('A')

  expect(a(1)).toEqual({type: 'A', payload: 1, meta: undefined})

  expect(a(1, 2)).toEqual({type: 'A', payload: 1, meta: 2})

  expect(a(undefinfed, 2)).toEqual({type: 'A', payload: 1, meta: 2})
  
```

Many projects get along just fine with the above convention: All actions accept these two optional argumnet and the responsibilty to construct the payload is on the caller.

This approach is flexible, non-verbose and simple. However, it lacks explicitnes with regard to the payload (and meta): what parameteres an action accepts? how does the payload look like?

Consider the following actions declerations:

```
const setID = makeActionCreator('SET_ID')

const setName = makeActionCreator('SET_NAME')

const associateChildren = makeActionCreator('ASSOCIATE_CHILDREN')

```

And their respective calls:

```
setID(5)

setName({name: 'testName'})

associateChildren({id: 1, children: [2,3,4]})

```

As can be seen, it is hard to cypher what the shape the payload each action expects just by looking at the action creation decleration and the shaping of the payload is done by the caller.
Also, we cannot support more then one parameter per (for the payload).

To overcome these limiations (at the cost of a bit more verbosity) we can add a second parameter which is an `argsMapper` which allows

```

const setID = makeActionCreator('SET_ID', id => id)

const setName = makeActionCreator('SET_NAME', name => ({name}))

const associateChildren = makeActionCreator('ASSOCIATE_CHILDREN', (parentId, childrenIds) => ({id: parentId, children: childrenId}))

```




At its simpliest form, `makeActionCreator`

## Enhanced async actions

### `makeAsyncActionCreator(baseName [, options])`

### `makeAsyncReducer(asyncActionCreator, fn)`

## Redcuer composition

### `composeReducer(...reducers)`
