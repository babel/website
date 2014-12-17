var gulp = require('gulp');
var less = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');
var jade = require('gulp-jade');

gulp.task('styles', function() {
  return gulp.src('./src/styles/styles.less')
    .pipe(less())
    .pipe(autoprefixer())
    .pipe(gulp.dest('./dist'));
});

gulp.task('scripts', function() {
  return gulp.src('./src/scripts.js')
    .pipe(gulp.dest('./dist'));
});

gulp.task('pages', function() {
  return gulp.src('./src/pages/*.jade')
    .pipe(jade({ pretty: true }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('build', ['styles', 'scripts', 'pages']);

gulp.task('watch', ['build'], function() {
  gulp.watch('./src/**/**.less', ['styles']);
  gulp.watch('./src/**/**.js', ['scripts']);
  gulp.watch('./src/**/**.jade', ['pages']);
});
