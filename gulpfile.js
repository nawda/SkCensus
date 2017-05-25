const gulp = require('gulp');
const inject = require('gulp-inject');
const wiredep = require('wiredep').stream;
const browserSync = require('browser-sync');

gulp.task('inject', ['inject:bower'], function() {
  var sources = gulp.src([
    './app/**/*.module.js',
    './app/**/*.js',
    './app/**/*.css',
    '!./app/bower_components/**/*.css',
    '!./app/bower_components/**/*.js',
  ]);

  return gulp
    .src('./app/index.html')
    .pipe(inject(sources, {relative: true}))
    .pipe(gulp.dest('./app/'));
});

gulp.task('inject:bower', function() {
  return gulp
    .src('./app/index.html')
    .pipe(wiredep())
    .pipe(gulp.dest('./app/'));
});

gulp.task('watch', function() {
  return gulp.watch('./app/**/*', ['reload']);
});

gulp.task('reload', function() {
  return browserSync.reload();
})

gulp.task('serve', [
  'inject', 'watch',
], function() {
  return browserSync.init({ // starts a browser-sync service
    server: './app/' // serving the ./ directory
  })
});
