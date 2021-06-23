const webpack = require('webpack')
const postCssNormalize = require('postcss-normalize')
const postCssImport = require('postcss-import')
const postCssCustomMedia = require('postcss-custom-media')
const postCssAutoPrefixer = require('autoprefixer')
const postCssNested = require('postcss-nested')
const postCssFlexBugFixes = require('postcss-flexbugs-fixes')
const postCssPresetEnv = require('postcss-preset-env')

module.exports = {
  // Necessary for external CSS imports to work
  // https://github.com/facebook/create-react-app/issues/2677
  ident: 'postcss',
  plugins: [
    postCssImport({
      addDependencyTo: webpack,
    }),
    postCssCustomMedia({
      importFrom: './src/config/media-queries.js',
    }),
    postCssAutoPrefixer(),
    postCssNested,
    postCssFlexBugFixes,
    postCssPresetEnv({
      autoprefixer: {
        flexbox: 'no-2009',
      },
      stage: 3,
    }),
    // Adds PostCSS Normalize as the reset css with default options,
    // so that it honors browserslist config in package.json
    // which in turn let's users customize the target behavior as per their needs.
    postCssNormalize(),
  ],
}
