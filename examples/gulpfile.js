'use strict';

var gulp = require('gulp');
var scp = require('..');

gulp.task('default', function() {
  return gulp.src('*.js', {cwd: __dirname + '/assets'})
  .pipe(scp({
    host: 'localhost',
    username: 'username',
    password: 'password',
    dest: '/home/username/',
    watch: function(client) {
      client.on('write', function(o) {
        console.log('write %s', o.destination);
      });
    }
  }))
  .on('error', function(err) {
    console.log(err);
  });
});
