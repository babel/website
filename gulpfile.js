var githubPages = require('gulp-gh-pages');
var gulp = require('gulp');

// TODO: All the other build stuff should probably be tasks in here too.

gulp.task('publish', function() {
  return gulp.src('_site/**/*')
    .pipe(githubPages({
      // Hey! Listen! Change me before merging!
      remoteUrl: 'https://' + process.env.GH_TOKEN + '@github.com/Daniel15/babel-site.git',
    }));
});
