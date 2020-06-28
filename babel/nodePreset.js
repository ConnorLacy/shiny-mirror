/*
  This preset is for the server side configuration

  https://babeljs.io/docs/en/presets#creating-a-preset
*/

const basePlugins = require('./plugins')

module.exports = function nodePreset(_api, options = {}) {
  // We want modules to be commonJS so we can hot swap ( ? ) modules from
  // server side. Client side has this property set to false by default, to
  // disable tranformation of es6 module syntax

  // corejs only has an affect when used alongside the following:
  // useBuiltIns: 'usage' [Set shippedProposals to true, which enables polyfills
  // and transforms for proposal which have been shipped in browsers for a while]
  // useBuiltIns: 'entry'. [Can directly import proposal polyfill]
  const {
    version = 'current',
    modules = 'commonjs',
    corejs = 3,
    useBuiltIns = 'entry',
    debug = false,
    typescript = false,
  } = options

  console.log(options)

  const presets = [
    [
      require.resolve('@babel/preset-env'),
      {
        modules,
        useBuiltIns,
        corejs,
        targets: {
          node: version,
        },
        debug,
      },
    ],
  ]

  const plugins = [
    ...basePlugins(options),
    require.resolve('@babel/plugin-proposal-dynamic-import'),
    require.resolve('@babel/plugin-transform-modules-commonjs'),
  ]

  if (typescript) {
    // Remove type annotations when parsing
    presets.push(require.resolve('@babel/preset-typescript'))
  }

  return { presets, plugins }
}
