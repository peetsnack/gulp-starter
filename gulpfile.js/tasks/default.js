var gulp = require('gulp');
var gulpSequence = require('gulp-sequence');
var getEnabledTasks = require('../lib/getEnabledTasks');

var defaultTask = function(cb) {
  var tasks = getEnabledTasks();
  console.log('tasks = %o', tasks);
  gulpSequence('clean', tasks.assetTasks, tasks.codeTasks, cb)
}

gulp.task('default', defaultTask)


// This isn't required by gulp, but I think it might be important
// for unit testing
module.exports = defaultTask
