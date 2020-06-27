/*
    Babel requires a configuration for transpiling Modern ES into common JS
    for cross-browser compatibility. Configuration defines presets -- groups
    of plugins
*/

module.exports = (api) => {
  const ENV = api.env()
  const CLIENT_DEVELOPMENT = ENV === 'client_development'
  const SERVER_DEVELOPMENT = ENV === 'server_development'
  const SERVER_PRODUCTION = ENV === 'server_production'

  // Cache configuration if in development ( so it doesn't reload all plugins )
  // https://babeljs.io/docs/en/config-files#apicache
  api.cache.using(() => SERVER_DEVELOPMENT || CLIENT_DEVELOPMENT)

  /* Presents can be babel-supplied preset configs, or we can ceate
  our own preset ( which is a user-assembled set of plugins) */
  return {
    presets: [
      SERVER_DEVELOPMENT || SERVER_PRODUCTION
        ? [
            // Use custom node preset if in development
            require.resolve('./babel/nodePreset'),
            {
              typescript: true,
              modules: false,
            },
          ]
        : [
            // Use custom client preset if in development
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
