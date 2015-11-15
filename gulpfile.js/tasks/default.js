var gulp = require('gulp');
var gulpSequence = require('gulp-sequence');
var getEnabledTasks = require('../lib/getEnabledTasks');

gulp.task('default', function(cb) {
  gulpSequence('clean', cb);
});
