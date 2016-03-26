/* eslint-env node */
import path from 'path';
import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import webpackConfig from '../webpack.config';
import config from './server-config';

var app = express();
var compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath
}));

app.use(webpackHotMiddleware(compiler));

app.get('*', function(request, response) {
  response.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(config.port || 8080, 'localhost', function(err) {
  if (err) {
    console.log(err); //eslint-disable-line no-console
    return;
  }

  console.log('Listening at http://localhost, port', config.port); //eslint-disable-line no-console
});
