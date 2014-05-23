'use strict';

var path = require('path');
var join = path.join;
var dirname = path.dirname;
var Client = require('scp2').Client;
var through = require('through2');
var debug = require('debug')('gulp-scp2');
var PluginError = require('gulp-util').PluginError;

module.exports = function(options) {
  options || (options = {});
  options.host = options.host || 'localhost';
  options.username = options.username || 'admin';
  options.dest = options.dest || '/home/' + options.username;

  var client = createClient(options);

  return through.obj(function transform(file, enc, callback) {
    if (file.isStream()) return callback(new PluginError('gulp-scp2', 'Streaming not supported.'));

    var path = join(options.dest, file.relative);
    client.mkdir(dirname(path), function() {
      client.write({
        destination: path,
        content: file.contents
      }, callback);
    });
  }, function flush(callback) {
    client.close();
    callback();
  });
};

function createClient(options) {
  var client = new Client(options);
  client.on('connect', function() {
    debug('ssh connect %s', options.host);
  });
  client.on('close', function() {
    debug('ssh connect %s', options.host);
  });
  client.on('mkdir', function(dir) {
    debug('mkdir %s', dir);
  });
  client.on('write', function(o) {
    debug('write %s', o.destination);
  });
  client.on('error', function(err) {
    debug('error %s', err);
  });
  return client;
}
