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



## Create package file

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

Install the `require-dir` module:

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











# Technologies

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



