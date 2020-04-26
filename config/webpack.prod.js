const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'production',

    output: {
      filename: 'js/[name].[hash].js',
      chunkFilename: '[id].[hash].chunk.js'
    },

  }
);
