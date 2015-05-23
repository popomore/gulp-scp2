'use strict';

var pathLib = require('path');
var join = pathLib.join;
var dirname = pathLib.dirname;
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

    if (isFunction(options.watch)) {
        options.watch(client);
    }

    return through.obj(function(file, enc, callback) {
            if (file.isStream()) {
                return callback(new PluginError('gulp-scp2', 'Streaming not supported.'));
            }

            var filePath = pathLib.relative(process.cwd(), file.path);

            console.log(filePath);


            var path = join(options.dest, filePath);
            client.mkdir(dirname(filePath), function(err) {
                if (err) {
                    return callback(new PluginError('gulp-scp2', err));
                }

                if (!file.isNull()) {
                    client.write({
                        destination: path,
                        content: file.contents
                    }, function(err) {
                        if (err) {
                            err = new PluginError('gulp-scp2', err);
                        }
                        callback(err);
                    });
                }
                else
                {
                  callback();
                }
            });
        },
        function flush(callback) {
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
