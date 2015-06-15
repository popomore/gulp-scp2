'use strict';

var path = require('path');
var join = path.join;
var dirname = path.dirname;
var Client = require('scp2').Client;
var through = require('through2');
var debug = require('debug')('gulp-scp2');

module.exports = function(options) {
  options || (options = {});
  options.host = options.host || 'localhost';
  options.username = options.username || 'admin';
  options.dest = options.dest || '/home/' + options.username;

  var client = createClient(options);

  if (isFunction(options.watch)) {
    options.watch(client);
  }

  return through.obj(function transform(file, enc, callback) {
    if (file.isStream()) {
      return callback(new Error('Streaming not supported.'));
    }

    if (file.stat.isDirectory()) {
      debug('ignore directory %s', file.path);
      return callback();
    }

    var path = fixWinPath(join(options.dest, file.relative));
    client.mkdir(dirname(path), function(err) {
      if (err) {
        return callback(err);
      }

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

function isFunction(fun) {
  return Object.prototype.toString.call(fun) === '[object Function]';
}

function fixWinPath(str) {
  return str.replace(/\\/g, '/');
}
