var gulp = require('gulp');
var inject = require('gulp-inject');

var angularFilesort = require('gulp-angular-filesort'),
  inject = require('gulp-inject'),
  naturalSort = require('gulp-natural-sort'),
  bowerFiles = require('main-bower-files'),
  es = require('event-stream');


gulp.task('inject', function () {
  return gulp.src('app/index.html')
    .pipe(inject(gulp.src(bowerFiles(), {read: false}), {
      name: 'bower',
      relative: true
    }))
    .pipe(inject(es.merge(
      gulp.src(['app/**/*.css', '!app/bower_components/**'], {read: false}),
      gulp.src(['app/**/*.js', '!app/bower_components/**', '!app/**/*_test.js'])
        .pipe(naturalSort())
        .pipe(angularFilesort())
    ), {relative: true}))
    .pipe(gulp.dest('app'));
});


gulp.task('dist', ['inject', 'copy'], function () {

});

gulp.task('serve', ['inject'], function () {

});