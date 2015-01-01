var gulp = require('gulp');
var util = require('gulp-util');
var _ = require('lodash');
var less = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');
var jade = require('gulp-jade');
var browserify = require('browserify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var sourcemaps = require('gulp-sourcemaps');

var bundler, options;
function getBundler() {
  if (!bundler) {
    options = _.extend({ debug: true }, watchify.args);
    bundler = watchify(browserify('./src/scripts/scripts.js', options));
  }
  return bundler;
}

function bundle() {
  return getBundler().bundle()
    .on('error', util.log)
    .pipe(source('scripts.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist'));
}

gulp.task('styles', function() {
  return gulp.src('./src/styles/styles.less')
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('scripts', function() {
  return bundle();
});

gulp.task('pages', function() {
  return gulp.src('./src/pages/*.jade')
    .pipe(jade({ pretty: true }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('images', function() {
  return gulp.src('./src/images/**')
    .pipe(gulp.dest('./dist/images'));
});

gulp.task('build', ['styles', 'scripts', 'pages', 'images']);

gulp.task('watch', ['build'], function() {
  gulp.watch('./src/**/**.less', ['styles']);
  gulp.watch(['./src/**/**.jade', './src/**/**.md'], ['pages']);
  gulp.watch('./src/images/**', ['images']);

  getBundler().on('update', function() {
    gulp.start('scripts');
  });
});
