/* eslint-env node */
/* eslint no-process-env:0 */
/* eslint no-var:0 */

var path = require('path');
var webpack = require('webpack');
var SpritesmithPlugin = require('webpack-spritesmith');

var ENTRY_POINTS = {
  development: ['webpack-hot-middleware/client', './src/index.tsx'],
  production: ['./src/index.tsx'],
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
    new SpritesmithPlugin({
      src: {
        cwd: './assets/icons',
        glob: '*.png'
      },
      target: {
        image: 'assets/icons.png',
        css: 'assets/icons.css'
      },
      apiOptions: {
        cssImageRef: './icons.png'
      },
    }),
  ],
  production: [
    new webpack.NoErrorsPlugin(),
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
    new SpritesmithPlugin({
      src: {
        cwd: path.resolve(__dirname, 'assets/icons'),
        glob: '*.png'
      },
      target: {
        image: path.resolve(__dirname, 'assets/icons.png'),
        css: path.resolve(__dirname, 'assets/icons.css')
      },
      apiOptions: {
        cssImageRef: './icons.png'
      },
    }),
  ]
};
var DEV_TOOLS = {
  development: 'eval',
  production: 'source-map'
};

var BABEL_PRESETS = {
  development: ['react', 'es2015-webpack', 'stage-0', 'react-hmre'],
  production: ['react', 'es2015-webpack', 'stage-0']
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
  resolve: {
    root: [path.resolve('src')],
    extensions: ['', '.jsx', '.js', '.tsx', '.ts']
  },
  module: {
    loaders: [
      {
        test: /\.(tsx|js)/,
        loaders: ['babel', 'ts'],
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
      },
      {
        test: /\.json$/,
        loader: 'json',
      }
    ]
  }
};
