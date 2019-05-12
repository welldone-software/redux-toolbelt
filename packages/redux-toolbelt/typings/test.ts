import makeActionCreator from "../src/makeActionCreator";
import makeAsyncActionCreator from "../src/makeAsyncActionCreator";
import { makeReducer, makeAsyncReducer } from "../src";
import { composeReducers } from "../src/composeReducers";

interface Action1 {
  type: string,
  payload: number;
  meta: { debug: boolean };
}

const a = makeActionCreator<Action1>('a', (payload: number, meta: boolean) => (
  { payload, debug: meta }
)
);
const b = makeActionCreator.withDefaults<Action1>({ prefix: 'pre' })('B', () => ({ payload: 1 }));
const action = a(1, false);
action.payload
const c = makeAsyncActionCreator<Action1>('Async', function () { return { payload: 1 } });

interface MyState {
  friends: string[];
}

const initialState: MyState = {
  friends: []
}
const reducer = makeReducer<MyState>(a, { defaultState: initialState });
reducer(undefined, action);
const reducer2 = makeReducer<MyState>(a, { defaultState: initialState });
const asyncReducer = makeAsyncReducer(c);
makeAsyncReducer.withDefaults({ dataProp: 'data' })(c)

composeReducers(
  reducer,
  reducer2,
  asyncReducer,
  {
    r4: (state, { payload }) => ({ ...state, ...payload }),
    r5: asyncReducer
  }
);
