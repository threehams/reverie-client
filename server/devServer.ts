/* eslint-env node */
import path = require('path');
import express = require('express');
import webpack = require('webpack');
import webpackConfig = require('../webpack.config');
import webpackDevMiddleware = require('webpack-dev-middleware');
import webpackHotMiddleware = require('webpack-hot-middleware');

import config from './config';

const app = express();

const compiler = webpack(webpackConfig);
app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath,
  stats: { chunks: false },
}));
app.use('/assets', express.static(path.join( __dirname, '..', 'assets')));

app.use(webpackHotMiddleware(compiler));

app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname, 'index.html'));
});

const server = app.listen(config.port || 8080, function(err: Error) {
  if (err) {
    // tslint:disable
    console.log(err);
    // tslint:enable
    return;
  }

  // tslint:disable
  console.log('Listening at http://localhost, port', config.port);
  // tslint:eisable
});
