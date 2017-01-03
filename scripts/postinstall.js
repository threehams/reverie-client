// tslint:disable
'use strict';
var deploy = process.env.DEPLOY;

if (!deploy) {
  process.exit(0);
}

var build = require('child_process').spawn('npm', ['run', 'build']);

build.stdout.on('data', function(data) {
  console.log(data.toString());
});
build.stderr.on('data', function(data) {
  console.log('ERR', data.toString());
});
build.on('error', function(err) {
  console.log(err);
  process.exit(1);
});
build.on('exit', function() {
  process.exit(0);
});
