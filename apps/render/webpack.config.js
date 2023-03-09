const { composePlugins, withNx } = require('@nrwl/webpack')
const { withReact } = require('@nrwl/react')

// Nx plugins for webpack.
module.exports = composePlugins(withNx(), withReact(), (config) => {
  config.ignoreWarnings = [/Failed to parse source map/]
  // Update the webpack config as needed here.
  // e.g. `config.plugins.push(new MyPlugin())`
  config.resolve.fallback = {
    buffer: require.resolve('buffer/'),
    crypto: require.resolve('crypto-browserify'),
    stream: require.resolve('stream-browserify'),
  }
  return config
})
