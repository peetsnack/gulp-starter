var gulp   = require('gulp')
var del    = require('del')
var config = require('../config')
var path   = require('path')

var cleanTask = function (cb) {
  var files = [];

  // Don't touch node_modules or source files!
  files.push('!node_modules/**/*');
  files.push('!' + path.join(config.root.src, '/**/*'));

  del(files).then(function(paths) {
    // console.log(paths)
    cb();
  })
}

gulp.task('clean', cleanTask);

