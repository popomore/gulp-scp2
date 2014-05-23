'use strict';

var gulp = require('gulp');
var scp = require('..');

gulp.task('default', function() {
  return gulp.src('*.js', {cwd: __dirname + '/assets'})
  .pipe(scp({
    host: 'localhost',
    username: 'username',
    password: 'password',
    dest: '/home/username/'
  }))
  .on('error', function(err) {
    console.log(err);
  });
});
