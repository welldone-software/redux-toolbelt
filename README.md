<h3 align="center">
  Redux Toolbelt
</h3>

<p align="center">
  A set of tools for quicker, easier, less verbose and safer <a href="http://redux.js.org/">Redux</a> development by <a href="http://welldone-software.com/">welldone-software</a>.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/redux-toolbelt"><img src="https://img.shields.io/npm/v/redux-toolbelt.svg?style=flat-square"></a>
  <a href="https://www.npmjs.com/package/redux-toolbelt"><img src="https://img.shields.io/npm/dm/redux-toolbelt.svg?style=flat-square"></a>
</p>

<p align="center">
  <img align="center" src="https://raw.githubusercontent.com/welldone-software/redux-toolbelt/master/redux-toolbelt-logo.png" alt="redux-toolbelt logo"/>
</p>

## Packages

This repository is a monorepo that we manage using [Lerna](https://github.com/lerna/lerna). That means that we actually publish several packages to npm from the same codebase, including:

| Package                                                                          | Description                                                  |
| -------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| [`redux-toolbelt`](/packages/redux-toolbelt)                                     | Core utillities for creating action creators and reducers    |
| [`redux-toolbelt-immutable-helpers`](/packages/redux-toolbelt-immutable-helpers) | Helper functions to "update" immutable objects               |
| [`redux-toolbelt-observable`](/packages/redux-toolbelt-observable)               | Utilities for using `redux-toolbelt` with `redux-observable` |
| [`redux-toolbelt-saga`](/packages/redux-toolbelt-saga)                           | Utilities for using `redux-toolbelt` with `redux-saga`       |
| [`redux-toolbelt-thunk`](/packages/redux-toolbelt-thunk)                         | Utilities for using `redux-toolbelt` with `redux-thunk`      |

## Demo

A demo project can be found here:

https://github.com/welldone-software/redux-toolbelt-demo

The demo can be run in a live sandbox environment here:

https://codesandbox.io/s/github/welldone-software/redux-toolbelt-demo

## Typing

Package now supports typescript.
