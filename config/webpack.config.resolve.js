/* eslint-disable */
const path = require('path')

const PnpWebpackPlugin = require('pnp-webpack-plugin')
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin')

const customAliases = require('./customAliases')
const paths = require('./paths')
const modules = require('./modules')

module.exports = {
  // This allows you to set a fallback for where webpack should look for modules.
  // We placed these paths second because we want `node_modules` to "win"
  // if there are any conflicts. This matches Node resolution mechanism.
  // https://github.com/facebook/create-react-app/issues/253
  // These are the reasonable defaults supported by the Node ecosystem.
  // We also include JSX as a common component filename extension to support
  // some tools, although we do not recommend using it, see:
  // https://github.com/facebook/create-react-app/issues/290
  // `web` extension prefixes have been added for better support
  // for React Native Web.
  modules: ['node_modules', paths.appNodeModules].concat(modules.additionalModulePaths || []),
  extensions: paths.moduleFileExtensions.map(ext => `.${ext}`),
  alias: {
    ...customAliases,

    // TODO: Add profiling
    // Allows for better profiling with ReactDevTools
    // ...(isEnvProductionProfile && {
    //   'react-dom$': 'react-dom/profiling',
    //   'scheduler/tracing': 'scheduler/tracing-profiling',
    // }),

    ...(modules.webpackAliases || {}),
  },
  plugins: [
    // Adds support for installing with Plug'n'Play, leading to faster installs and adding
    // guards against forgotten dependencies and such.
    PnpWebpackPlugin,
    // Prevents users from importing files from outside of src/ (or node_modules/).
    // This often causes confusion because we only process files within src/ with babel.
    // To fix this, we prevent you from importing files out of src/ -- if you'd like to,
    // please link the files into your node_modules/ and let module-resolution kick in.
    // Make sure your source files are compiled, as they will not be processed in any way.
    new ModuleScopePlugin(paths.appSrc, [paths.appPackageJson]),
  ],
}
