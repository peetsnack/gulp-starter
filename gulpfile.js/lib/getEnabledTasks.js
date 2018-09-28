var config = require('../config');

var assetTasks = ['images'];
var codeTasks = ['html'];


module.exports = function(env) {

  // This is the function used to filter the lists of tasks.
  // Right now, it only checks to see if the task is listed in
  // config.json.
  var matchFilter = function(task) {
    if (config.tasks[task]) {
      return task;
    }
  };

  // Return subsets of the two lists of tasks
  return {
    assetTasks: assetTasks.map(matchFilter).filter(Boolean),
    codeTasks: codeTasks.map(matchFilter).filter(Boolean)
  };
}
