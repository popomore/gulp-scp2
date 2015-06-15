'use strict';

var gulp = require('gulp');
var scp = require('..');

gulp.task('default', function() {
  return gulp.src('**/*', {cwd: __dirname})
  .pipe(scp({
    host: 'localhost',
    username: 'admin',
    password: 'test',
    dest: '/home/admin/',
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
