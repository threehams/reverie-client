import path = require('path');
import webpack = require('webpack');
import SpritesmithPlugin = require('webpack-spritesmith');

const ENTRY_POINTS = {
  development: ['webpack-hot-middleware/client', 'react-hot-loader/patch', './client/index.tsx'],
  production: ['./client/index.tsx'],
};

type Environment = 'development' | 'production';

const ENV: Environment = process.env.NODE_ENV || 'development';

// Production build uses tsc and ends up in tsDist/server/, while development uses ts-node and is served from server/
// hacky, but can't seem to find a cleaner solution right now
const fromRootPath = (...paths) => path.resolve(
  path.resolve(__dirname, '..', ENV === 'production' ? '..' : ''),
  ...paths,
);

const PLUGINS = {
  development: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '\'development\'',
      },
    }),
    new SpritesmithPlugin({
      apiOptions: {
        cssImageRef: './icons.png',
      },
      src: {
        cwd: './assets/icons',
        glob: '*.png',
      },
      target: {
        css: 'assets/icons.css',
        image: 'assets/icons.png',
      },
    }),
  ],
  production: [
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '\'production\'',
      },
    }),
    new SpritesmithPlugin({
      apiOptions: {
        cssImageRef: './icons.png',
      },
      src: {
        cwd: fromRootPath('assets/icons'),
        glob: '*.png',
      },
      target: {
        css: fromRootPath('assets/icons.css'),
        image: fromRootPath('assets/icons.png'),
      },
    }),
  ],
};

const DEV_TOOLS = {
  development: 'eval',
  production: 'source-map',
};

export default {
  devtool: DEV_TOOLS[ENV],
  entry: ENTRY_POINTS[ENV],
  module: {
    loaders: [
      {
        include: [fromRootPath('client'), fromRootPath('shared')],
        loaders: ['react-hot-loader/webpack', 'ts'],
        test: /\.(tsx|ts)/,
      },
      {
        include: [fromRootPath('client'), fromRootPath('shared')],
        loaders: ['react-hot-loader/webpack'],
        test: /\.js/,
      },
      {
        loader: 'style-loader!css-loader',
        test: /\.css$/,
      },
      {
        loader: 'json',
        test: /\.json$/,
      },
    ],
  },
  output: {
    filename: 'bundle.js',
    path: fromRootPath('build'),
    publicPath: '/build/',
  },
  plugins: PLUGINS[ENV],
  resolve: {
    extensions: ['', '.jsx', '.js', '.tsx', '.ts'],
    root: [fromRootPath('client')],
  },
};
