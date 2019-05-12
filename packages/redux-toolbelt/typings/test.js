import {makeActionCreator, makeReducer } from './../src/'

const a = makeActionCreator('a', ()=>({payload:1}))
const action = a('a');

makeReducer(a)
