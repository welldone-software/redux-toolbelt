import makeActionCreator from "../src/makeactioncreator";

interface Action1 {
  type: string,
  payload: number;
  meta: any;
}

const a = makeActionCreator<Action1>('a',()=>({payload:1}));
const b = makeActionCreator.withDefaults<Action1>({prefix:'pre'})('B', ()=>({payload:1}));
const action = a(1);
