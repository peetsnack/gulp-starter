var config = require('../config');
if (!config.tasks.images) return;

var gulp = require('gulp');
var path = require('path');

var paths = {
  src: path.join(config.root.src, config.tasks.images.src, '/**'),
  dest: path.join(config.root.dest, config.tasks.images.dest)
};

var imagesTask = function() {
  return gulp.src(paths.src)
    .pipe(gulp.dest(paths.dest));
};

gulp.task('images', imagesTask);
module.exports = imagesTask;
