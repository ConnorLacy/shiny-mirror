/*
  This plugins file will export base level presets and plugins shared across 
  client and node Presets, which have additional, specific, plugins/presets
*/

module.exports = function plugins(options = {}) {
  const { inlineEnv = false, typescript = false, production = false } = options

  const plugs = [require.resolve('@babel/plugin-syntax-dynamic-import')]

  // Inline env vars like NODE_ENV
  if (inlineEnv) {
    require.resolve('babel-plugin-transform-inline-enviornment-variables')
  }

  // During development, typescript will be true. During production, this will
  // be false because it will compile to ES JS before Babel is utilized by Webpack
  if (typescript) {
    plugs.push(
      // 'plugin-syntax' plugins just allow Babel to parse the special syntax
      require.resolve('@babel/plugin-syntax-nullish-coalescing-operator'),
      require.resolve('@babel/plugin-syntax-optional-chaining'),
      [require.resolve('@babel/plugin-proposal-decorators'), { legacy: true }],
      [
        require.resolve('@babel/plugin-proposal-class-properties'),
        { loose: true },
      ],
      // https://babeljs.io/docs/en/babel-plugin-proposal-numeric-separator
      require.resolve('@babel/plugin-proposal-numeric-separator'),
      [
        require.resolve('@babel/plugin-proposal-nullish-coalescing-operator'),
        { loose: true },
      ],
      [
        require.resolve('@babel/plugin-proposal-optional-chaining'),
        { loose: true },
      ],
    )
  } else {
    plugs.push([
      require.resolve('@babel/plugin-proposal-class-properties'),
      {
        // Loose helps reduce the bundle size by using assignment expressions
        // for common JS instead of Object.defineProperty()
        // https://babeljs.io/docs/en/babel-plugin-proposal-class-properties
        loose: true,
      },
    ])
  }

  if (production) {
    plugs.push([
      // This plugin is 'tree-shaking'. When Babel creates helper functions, it
      // creates one for each file in the AST. This results in duplication,
      // increasing the size of the chunk. This plugin removes duplication
      // by making all helpers reference @babel/runtime
      '@babel/plugin-transform-runtime',
      {
        corejs: 2,
        useESModules: true,
      },
    ])
  }

  return plugs
}
