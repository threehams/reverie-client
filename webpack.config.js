/* eslint-env node */
/* eslint no-process-env:0 */
/* eslint no-var:0 */

var path = require('path');
var webpack = require('webpack');
var SpritesmithPlugin = require('webpack-spritesmith');

var ENTRY_POINTS = {
  development: {
    bundle: ['eventsource-polyfill', 'webpack-hot-middleware/client', './src/index'],
  },
  production: {
    bundle: ['./src/index'],
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
    new webpack.optimize.DedupePlugin(),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
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
    filename: '[name].js',
    publicPath: '/dist/'
  },
  plugins: PLUGINS[ENV],
  resolve: ['dist', 'node_modules'],
  module: {
    loaders: [
      {
        test: /\.js/,
        loader: 'babel',
        include: path.join(__dirname, 'src'),
        query: {
          presets: BABEL_PRESETS[ENV]
        }
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  }
};
