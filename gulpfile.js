/*jslint node:true*/

var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var watchify = require('watchify');
var babel = require('babelify');
var exit = require('gulp-exit');

function compile(watch) {
  var bundler = browserify('./src/scripts/app.js', { debug: true }).transform(babel);

  if (watch) {
    bundler = watchify(bundler);
  }
  
  function rebundle() {
    bundler.bundle()
      .on('error', function(err) { console.error(err); this.emit('end'); })
      .pipe(source('farmstand.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./build'));
  }

  if (watch) {
    bundler.on('update', function() {
      console.log('-> bundling...');
      rebundle();
    });
  }

  rebundle();
}

function watch() {
  return compile(true);
};

gulp.task('copyStatic', function() {
  gulp.src(['./src/index.html']).pipe(gulp.dest('./build'));
});

gulp.task('build', ['copyStatic'], function() { return compile(); });
gulp.task('watch', ['copyStatic'], function() { return watch(); });

gulp.task('default', ['watch']);