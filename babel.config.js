/*
    Babel requires a configuration for transpiling Modern ES into common JS
    for cross-browser compatibility. Configuration defines presets -- groups
    of plugins
*/
console.log('Appying configuration to Babel...')

module.exports = (api) => {
  // Babel looks for "envName" when loaded. If not supplied, looks to NODE_ENV
  // to use for "envName". We supplied NODE_ENV in the run script in package.json
  // api.env() returns value of "envName"
  const ENV = api.env()

  // Assign boolean value depending on NODE_ENV mode
  const CLIENT_DEVELOPMENT = ENV === 'client_development'
  const SERVER_DEVELOPMENT = ENV === 'server_development'
  const SERVER_PRODUCTION = ENV === 'server_production'

  // Cache configuration if in development ( so it doesn't reload all plugins )
  // https://babeljs.io/docs/en/config-files#apicache
  api.cache.using(() => SERVER_DEVELOPMENT || CLIENT_DEVELOPMENT)

  // Supplying our custom presets for server and client which extend off base
  // plugins and specify client/server specific plugins/preset options
  return {
    presets: [
      SERVER_DEVELOPMENT || SERVER_PRODUCTION
        ? [
            require.resolve('./babel/nodePreset'),
            {
              typescript: true,
              modules: false,
            },
          ]
        : [
            require.resolve('./babel/clientPreset'),
            {
              typescript: true,
              production: !CLIENT_DEVELOPMENT,
            },
          ],
      '@babel/preset-react',
    ],
  }
}
