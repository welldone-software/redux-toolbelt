module.exports = function(api) {
  return {
    presets: [
      ['@babel/preset-env', {
        targets: api.env('test') ? {node: 'current'} : {},
        modules: api.env('cjs') || api.env('test') ? 'cjs' : false,
      }],
    ],
    plugins: [
      ['transform-imports', {
        lodash: {
          // eslint-disable-next-line no-template-curly-in-string
          transform: 'lodash-es/${member}',
          preventFullImport: true,
        },
      }],
      '@babel/plugin-proposal-export-default-from',
      '@babel/plugin-proposal-export-namespace-from',
    ],
  }
}
