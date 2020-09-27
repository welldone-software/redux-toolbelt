module.exports = function(api) {
  return {
    presets: [
      ['@babel/preset-env', {
        targets: api.env('test') ? {node: 'current'} : {},
        modules: api.env('cjs') || api.env('test') ? 'cjs' : false,
      }],
    ],
    plugins: [
      '@babel/plugin-proposal-export-default-from',
      '@babel/plugin-proposal-export-namespace-from',
    ],
  }
}
