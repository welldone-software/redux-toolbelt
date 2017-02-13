export default {
  entry: [
    './src',
  ],
  output: {
    filename: 'redux-toolbelt.js',
    path: './dist',
    library: 'ReduxToolbelt',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {test: /\.js$/, exclude: /node_modules/, loader: 'eslint-loader', enforce: 'pre'},
      {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
    ],
  },
}

