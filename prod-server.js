/* eslint-env node */
var path = require('path');
var express = require('express');

var config = require('./prod-server-config');

var app = express();

// app.use(compress());
app.use('/dist', express.static(path.join( __dirname, 'dist')));

app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname, 'src', 'index.html'));
});

app.listen(config.port || 8080, function(err) {
  if (err) {
    console.log(err); //eslint-disable-line no-console
    return;
  }

  console.log('Listening at http://localhost, port', config.port); //eslint-disable-line no-console
});
