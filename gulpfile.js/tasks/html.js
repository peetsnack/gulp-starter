var config = require('../config')
if (!config.tasks.html) return;

var gulp = require('gulp');
var path = require('path');

var paths = {
  src: path.join(config.root.src, config.tasks.html.src, '/**/*.html'),
  dest: path.join(config.root.dest, config.tasks.html.dest),
};

var htmlTask = function() {
  return gulp.src(paths.src)
    .pipe(gulp.dest(paths.dest))
};

gulp.task('html', htmlTask);
module.exports = htmlTask;
