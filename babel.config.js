module.exports = function(api) {
  const targets = api.env('test') ?
    {node: 'current'} : {}

  return {
    presets: [
      ['@babel/preset-env', {targets}],
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
