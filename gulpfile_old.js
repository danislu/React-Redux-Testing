var gulp = require('gulp');
var gutil = require('gulp-util');
var tap = require('gulp-tap');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var connect = require('gulp-connect');
var sass = require('gulp-sass');
 
gulp.task('connect', function(){
  connect.server({
    port: 8080,
    livereload: true
  });
});

gulp.task('js:build', function () {
  browserify({
    entries: 'app/index.jsx',
    extensions: ['.jsx','.js'],
    debug: true
  })
  .on("error", function (err) {
    gutil.log(gutil.colors.red("Browserify compile error:"), err.message, "\n\t", gutil.colors.cyan("in file"), file.path);
    gutil.beep();
  })
  .transform(babelify)
  .on("error", function (err) {
    gutil.log(gutil.colors.red("Browserify compile error:"), err.message, "\n\t", gutil.colors.cyan("in file"), file.path);
    gutil.beep();
  })
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(gulp.dest('www'));
});
 
gulp.task('js:watch', function () {
   gulp.watch(['app/**/*.js', 'app/**/*.jsx'], ['js:build']);
});

gulp.task('sass', function () {
  gulp.src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./www/css'));
});
 
gulp.task('sass:watch', function () {
  gulp.watch('./sass/**/*.scss', ['sass']);
});

gulp.task('default', ['connect', 'sass', 'js:build', 'js:watch', 'sass:watch']);
//gulp.task('default', ['connect', 'js:watch', 'build']);