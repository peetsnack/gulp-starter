# gulp-starter

This is my attempt to reverse engineer the
[vigetlabs/gulp-starter repo](https://github.com/vigetlabs/gulp-starter).

I want to transform this into a step-by-step, so that it makes sense to me.
Each step should add one more feature, and I should understand what is gained
by doing that step.


# See also / links

* vigetlabs/gulp-starter repo:
    * [README](https://github.com/vigetlabs/gulp-starter)
    * [Wiki](https://github.com/vigetlabs/gulp-starter/wiki)
* The blog post [Gulp + Browserify: The Everything
  Post](https://viget.com/extend/gulp-browserify-starter-faq).
  Note there's a little bit of irony here: even though the blog post has "browserify"
  in it, the repo has switched to using Webpack.
* [Gulp documentation](https://github.com/gulpjs/gulp/blob/master/docs/README.md)




# Features

This list is from their README. I'll check these off, as I learn about
them and incorporate them here:

- **CSS:** [Sass](http://sass-lang.com/) (indented, scss, or both)
    - Libsass (node-sass) for super fast compiles
    - Autoprefixer
- **JS:** Modular ES6 with [Babel](http://babeljs.io/) and 
  [Webpack](http://webpack.github.io/)
    - Async requires
    - Multiple bundles
    - Shared modules
    - Source Maps
- **HTML**: Static templating with 
  [Nunjucks](https://mozilla.github.io/nunjucks/) and 
  [gulp-data](https://github.com/colynb/gulp-data)
- **Images:**
    - **SVG Sprites**: Compiles a spritesheet from a folder of SVGs
    - Compression with image-min
- **Fonts:**
    - **Icon Fonts:** Generate from a folder of SVGs
    - Folder and `.sass` mixin for including WebFonts
- **Development Mode:**
    - File Watching and Live Reloading with [BrowserSync](http://www.browsersync.io/)
    - Source Maps
- **Production Builds:**
    - JS and CSS are uglified and minified
    - All filneames are revisioned with an md5 hash, a `rev-manifest.json` 
      file is genrearted and all asset references are updated in html, css, and js
    - File size reporting
    - Local production sever for testing
- **Testing:**
    - JS test examples with Karma, Mocha, Chai, Sinon
    - Travis CI integration
- **Deployment:**
    - Quickly deploy `public` folder to gh-pages (`gulp deploy` task)



# Steps

## Create project directory, and initialize a git repo

Make a repo on GitHub, then, locally:

```
mkdir gulp-starter
cd gulp-starter
git init
git remote add origin git@github.com:Klortho/gulp-starter.git
```

Create a README.md file and LICENSE file.  Use 
[WTFPL](http://www.wtfpl.net/about/) for the license. [Note that for this
repo, I won't directly copy any of the original repo's code, so I think
I can get away with not using their MIT license.]

Create .gitignore with:

```
*.sublime-project
*.sublime-workspace
```

Then:

```
git add README.md LICENSE .gitignore
git commit -m "Initial commit"
git push origin master
```

***See branch 
[01-initial-repo](https://github.com/Klortho/gulp-starter/tree/01-initial-repo).***


## Set up your Node environment

Install [nvm](https://github.com/creationix/nvm).
You can install with homebrew with:

```
brew install nvm
```

Next, check the [Node.js page](https://nodejs.org/en/) page for the latest
LTS (long-term-support) version of Node.js, and install it with, for
example, 

```
nvm install 4.2.2
```

Check that it worked:

```
$ node --version    #=> v4.2.2
```


## Create package.json file

Run: 

```
npm init
```

Answer the questions:

* Use `0.0.1` for the version
* *index.js* for the entry point?
* test command: leave blank for now
* author: Chris Maloney

Add it and commit. Then:

```
npm install
```

***See branch 
[02-package-json](https://github.com/Klortho/gulp-starter/tree/02-package-json).***


# Start with gulp

Install `gulp` to this project, while at the same time adding it to 
package.json:

```
npm install gulp --save-dev
```

That created the *node_modules* directory. Add that to your .gitignore.

Next, create the "gulpfile", which will really
be a tree of files. Normally, it's one file named *gulpfile.js*, but 
in this implementation, *gulpfile.js* will be a directory, with the main
script being *index.js* inside that. Create that file:

```
var requireDir = require('require-dir')
requireDir('./tasks', { recurse: true })
```

Install the [require-dir](https://www.npmjs.com/package/require-dir) module:

```
npm install require-dir --save-dev
```

Create the subdirectory *tasks*, and then the file *default.js* inside that:

```
var gulp = require('gulp')
gulp.task('default', function(cb) {});
```

Check that it works:

```
gulp
```

That should run without errors, and give `Starting 'default'...` as the last
message.

Add *gulpfile.js* to the repo, and commit everything.

***See branch 
[03-gulp](https://github.com/Klortho/gulp-starter/tree/03-gulp).***


## Add a `clean` task

In this step, we'll implement some fancy task management code, but 
without using it much yet. The proximate goal is to create a
`clean` task. See the recipe [Delete files and 
folders](https://github.com/gulpjs/gulp/blob/master/docs/recipes/delete-files-folder.md) for more info.

Change default.js to:

* Require [gulp-sequence](https://www.npmjs.com/package/gulp-sequence), which
  allows easy control over the ordering of tasks
* Require a custom utility module getEnabledTasks, described more below
* Add the `clean` task

The whole thing should look like this now:

```
var gulp = require('gulp');
var gulpSequence = require('gulp-sequence');
var getEnabledTasks = require('../lib/getEnabledTasks');

gulp.task('default', function(cb) {
  gulpSequence('clean', cb);
});
```

Install gulp-sequence:

```
npm install gulp-sequence --save-dev
```

Create the *gulpfile.js/lib/getEnabledTasks.js*, starting out with the following:

```js
var config = require('../config');
```

Create *gulpfile.js/config.json*, that defines the main source and destination
directories, with:

```json
{
  "root": {
    "src": "./src",
    "dest": "./public"
  }
}
```

Create the *gulpfile.js/tasks/clean.js* task file with:

```js
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
```

Run `gulp clean`, and `gulp` by itself, and verify that they work.


## Add `html` and `images` tasks

For now, these tasks will simply copy the src files to the destination
directory (public).

In gulpfile.js/lib/getEnabledTasks.js, create some arrays to hold
two groups of tasks:

```js
var assetTasks = ['images'];
var codeTasks = ['html'];
```

Next define its export to be a function that returns an object
that has two lists of tasks, each of which is a subset of the
two groups:

```js
var compact = require('lodash/array/compact');
...

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
    assetTasks: compact(assetTasks.map(matchFilter)),
    codeTasks: compact(codeTasks.map(matchFilter))
  };
}
```

This uses the `compact` method from [lodash](https://lodash.com/), 
so you'll need to install it:

```
npm install lodash --save-dev
```

Add a `tasks` object to config.json, with parameters for
these new tasks:

```js
"tasks": {
  "html": {
    "src": "html",
    "dest": "./"
  },

  "images": {
    "src": "images",
    "dest": "images",
    "extensions": ["jpg", "png", "svg", "gif"]
  }
}
```

Create a gulpfile.js/tasks/html.js file, with:

```js
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
```

Create a "hello world" HTML file in src/html/index.html.
Then run `gulp html`, and verify that the `html` task runs, and the
file gets copied to public/index.html.

Commit gulpfile.js/tasks/html.js and the src/ directory to git,
and add public to .gitignore.

Similarly, create gulpfile.js/tasks/images.js:

```js
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
```

Copy an image file into src/images (e.g. gulp.png), and then run

```
gulp images
```

Verify that the file gets copied to public/images.

Now, in the clean.js task, add "public" to the list of files to
clean:

```js
var files = ['public'];
```

Run `gulp` by itself, and verify that all the three tasks run.



# Technologies / reference documentation

## Gulp tasks

This repo uses some fancy techniques to manage gulp tasks.

All of the available tasks are listed in gulpfile.js/config.json.

When you enter a `gulp` command, it first reads gulpfile.js/index.js,
which then recursively `require`s all of the files under 
the tasks subdirectory.





## Webpack

In the README, under [notable changes from version 
1](https://github.com/vigetlabs/gulp-starter#notable-changes-from-10), he writes
that he changed from Browserify to Webpack, because:

* Async CommonJS module requires
* Automatically splits out shared dependencies

See also:

* [Browserify VS Webpack - JS Drama](http://blog.namangoel.com/browserify-vs-webpack-js-drama)
* [Webpack for Browserify users](http://webpack.github.io/docs/webpack-for-browserify-users.html)


## CommonJS / modules

See also:

* [CommonJS home page](http://www.commonjs.org/) - this is a shambles.
* The SO question/answer [Relation between CommonJS, AMD and 
  RequireJS?](http://stackoverflow.com/questions/16521471/relation-between-commonjs-amd-and-requirejs)
* [Node.js module documentation](https://nodejs.org/api/modules.html#modules_file_modules)



