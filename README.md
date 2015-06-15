# gulp-scp2 [![Build Status](https://travis-ci.org/popomore/gulp-scp2.png?branch=master)](https://travis-ci.org/popomore/gulp-scp2) [![Coverage Status](https://coveralls.io/repos/popomore/gulp-scp2/badge.png?branch=master)](https://coveralls.io/r/popomore/gulp-scp2?branch=master) 

Copy file to remote server, using scp2 that is a pure javascript implement.

---

## Install

```
$ npm install gulp-scp2 -g
```

## Usage

```
var gulp = require('gulp');
var scp = require('gulp-scp2');

gulp.task('default', function() {
  return gulp.src('**/*.js')
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
```

More see [example](https://github.com/popomore/gulp-scp2/blob/master/examples/gulpfile.js)

## Options

### options.host
Type: `String`
Default value: `localhost`

A string value that is the host of the server.

### options.port
Type: `Number`
Default value: `22`

The ssh port of the server.


### options.username
Type: `String`
Default value: `admin`

The username of the server.


### options.password
Type: `String`

The password of the user on the remote server.

### options.dest
Type: `String`
Default value: `/home/username`

Remote server directory

### options.watch
Type: `Function`

You can get the `client` instance, and watch events.

### More Options

- host
- port
- hostHash
- hostVerifier
- username
- password
- agent
- privateKey
- passphrase
- publicKey

Read more: https://github.com/mscdex/ssh2#connection-methods

## LISENCE

Copyright (c) 2015 popomore. Licensed under the MIT license.
