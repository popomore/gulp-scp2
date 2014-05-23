var gulp = require('gulp');
var scp = require('..');

gulp.src('*.js', {cwd: __dirname + '/assets'})
  .pipe(scp({
    host: 'localhost',
    username: 'username',
    password: 'password',
    dest: '/home/username/'
  }));
