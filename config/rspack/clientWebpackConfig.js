// The source code including full typescript support is available at: 
// https://github.com/shakacode/react-on-rails-demo-ssr-hmr/blob/master/config/webpack/clientWebpackConfig.js

const commonWebpackConfig = require('./commonWebpackConfig');

const configureClient = () => {
  const clientConfig = commonWebpackConfig();

  /*
   * server-bundle is special and should ONLY be built by the serverConfig.
   * Leaving it in causes a "window" not found error referring to
   * window["webpackJsonp"], because the client config tries to load chunks.
   */
  delete clientConfig.entry['server-bundle'];

  return clientConfig;
};

module.exports = configureClient;
