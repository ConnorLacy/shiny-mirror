/*
  This preset exists as an additional layer of specificity below the base
  plugins

  https://babeljs.io/docs/en/presets#creating-a-preset
*/

const basePlugins = require('./plugins')

module.exports = function clientPreset(_api, options = {}) {
  // Default options for client Preset
  const {
    modules = false,
    corejs = 2,
    shippedProposals = true,
    debug = false,
    useBuiltIns = 'usage',
    typescript = false,
    production = false,
    loose = true,
  } = options

  // This is just option configuration of the provided babel preset-env,
  // which is essential for proper transpiling. Our predefined plugins
  // file specifies in finer detail additional plugins necessary for the syntax
  // we intend to use with TypeScript
  const presets = [
    [
      // Smart preset which contains many standard plugins
      // that handle syntax transforms ( browser polyfills ) so you don't
      // have to micromanage all transforms. Also makes bundles smaller!
      // https://babeljs.io/docs/en/babel-preset-env
      require.resolve('@babel/preset-env'),
      {
        loose,
        modules,
        shippedProposals,
        useBuiltIns,
        corejs,
        targets: {
          browsers: production
            ? '>1%, not dead, not ie 11, not op_mini all'
            : 'last 2 Chrome versions',
        },
        debug,
      },
    ],
  ]

  const plugins = [...basePlugins(options)]

  if (typescript) {
    // This preset parses TypeScript and removes Type annotations -- which
    // would not be understood by the webpack compiler.
    presets.push(require.resolve('@babel/preset-typescript'))
  }

  return { presets, plugins }
}
