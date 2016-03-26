/* eslint-env node */
var path = require('path');
var webpack = require('webpack');

var ENTRY_POINTS = {
  dev: [
    //'eventsource-polyfill', // necessary for hot reloading with IE
    'webpack-hot-middleware/client',
    './src/index'
  ],
  production: [
    './src/index'
  ]
};

var ENV = process.env.NODE_ENV || 'production';

var PLUGINS = {
  dev: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  production: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": "'production'"
    })
  ]
};
var DEV_TOOLS = {
  dev: 'eval',
  production: 'source-map'
};

module.exports = {
  devtool: DEV_TOOLS[ENV],
  entry: ENTRY_POINTS[ENV],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  plugins: PLUGINS[ENV],
  module: {
    loaders: [
      {
        test: /\.js/,
        loader: 'babel',
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      }
    ]
  }
};
