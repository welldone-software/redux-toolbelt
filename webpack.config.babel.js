import webpack from 'webpack'
import merge from 'webpack-merge'

export default (env) => {

  process.env.BABEL_ENV = process.env.NODE_ENV = env.build

  const prod = {
    entry: [
      './lib',
    ],
    output: {
      filename: 'redux-toolbelt.js',
      path: './dist',
      library: 'ReduxToolbelt',
      libraryTarget: 'umd',
    },
    module: {
      rules: [{
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'eslint-loader',
          enforce: 'pre',
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production'),
        },
      }),
    ],
  }


  const min = {
    output: {
      filename: 'redux-toolbelt.min.js',
    },
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
          drop_console: true,
        },
        mangle: {
          screw_ie8 : true,
        },
      }),
    ],
  }

  return [
    prod,
    merge(prod, min),
  ]
}
