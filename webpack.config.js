/* eslint-env node */
/* eslint no-process-env:0 */
/* eslint no-var:0 */

var path = require('path');
var webpack = require('webpack');

var EXTERNAL = [
  'core-js',
  'immutable',
  'radium',
  'react',
  'react-addons-shallow-compare',
  'react-dnd',
  'react-dnd-html5-backend',
  'react-dom',
  'react-markdown',
  'react-redux',
  'reconnectingwebsocket',
  'redux',
  'redux-immutable',
  'redux-thunk',
  'reselect'
];
var DEV_EXTERNAL = [
  'babel-preset-react-hmre'
];

var ENTRY_POINTS = {
  development: {
    bundle: ['eventsource-polyfill', 'webpack-hot-middleware/client', './src/index'],
    vendor: ['eventsource-polyfill', 'webpack-hot-middleware/client'].concat(EXTERNAL).concat(DEV_EXTERNAL)
  },
  production: {
    bundle: ['./src/index'],
    vendor: EXTERNAL
  }
};

var ENV = process.env.NODE_ENV || 'development';

var PLUGINS = {
  development: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '\'development\''
      }
    }),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js', Infinity)
  ],
  production: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '\'production\''
      }
    }),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js', Infinity)
  ]
};
var DEV_TOOLS = {
  development: 'eval',
  production: 'source-map'
};

module.exports = {
  devtool: DEV_TOOLS[ENV],
  entry: ENTRY_POINTS[ENV],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
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
        test: /\.scss$/,
        loader: 'style-loader!css-loader!sass-loader'
      },
      {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  }
};
