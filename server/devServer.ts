import path = require('path');
import express = require('express');
import webpack = require('webpack');
import webpackDevMiddleware = require('webpack-dev-middleware');
import webpackHotMiddleware = require('webpack-hot-middleware');

import webpackConfig from './webpack.config';

const app = express();

const compiler = webpack(webpackConfig);
app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath,
  stats: { chunks: false },
}));
app.use('/assets', express.static(path.join( __dirname, '..', 'assets')));

app.use(webpackHotMiddleware(compiler));

app.get('/', (request, response) => {
  response.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(8080, (err: Error) => {
  if (err) {
    // tslint:disable-next-line no-console
    console.log(err);
    return;
  }

  // tslint:disable-next-line no-console
  console.log('Listening at http://localhost, port', 8080);
});
