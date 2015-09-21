var gulp = require('gulp'),
    source = require('vinyl-source-stream'),
    uglify = require('gulp-uglify'),
    browserify = require('browserify'),
    watchify = require('watchify'),
    reactify = require('reactify'),
    babelify = require("babelify");

var plugins = require("gulp-load-plugins")({
  pattern: ['gulp-*', 'gulp.*'],
  replaceString: /\bgulp[\-.]/
});

var paths = {
  js: ['src/app/*']
};

gulp.task('js', function() {
  browserify({
      entries: ['src/app/render.jsx'],
      transform: [babelify,reactify]
    })
    .bundle()
    .pipe(source('bundle.min.js'))
    .pipe(plugins.streamify(plugins.uglify('bundle.min.js')))
    .pipe(gulp.dest('public/build'));
});

gulp.task('watch', function() {
  gulp.watch(paths.js, ['js']);
});

gulp.task('default', ['watch', 'js']);

