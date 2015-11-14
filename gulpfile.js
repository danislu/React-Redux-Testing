var watch      = require("gulp-watch");
var plumber    = require("gulp-plumber");
var tap        = require("gulp-tap");
var browserify = require("browserify");
var gulpif     = require("gulp-if");
var babelify   = require('babelify');
var streamify  = require("gulp-streamify");
var gutil      = require('gulp-util');
var source = require('vinyl-source-stream');
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require("gulp-rename");
var connect = require('gulp-connect');

var isDebug = false;

var files = {
    scripts: ['app/**/*.js','app/**/*.jsx']
}

var build = function (){
        var compileStream = gulp.src("app/index.jsx")
            .pipe(plumber())
            .pipe(tap(function (file) {
                var d = require('domain').create();
                d.on("error",
                    function (err) {
                        gutil.log(gutil.colors.red("Browserify compile error:"), err.message, "\n\t", gutil.colors.cyan("in file"), file.path);
                        gutil.beep();
                    }
                );
                
                d.run(function () {
                    file.contents = browserify({
                        entries: [file.path],
                        extensions: ['.jsx','.js'],
                        debug: isDebug
                    })
                    .transform(babelify)
                    .bundle();
                });
            }));
        
        var bundleStream = compileStream
            .pipe(gulpif(!isDebug, streamify(uglify({
                compress: true
            }))))
            .pipe(rename('bundle.js'))
            .pipe(gulp.dest('www/'));
        
        compileStream.on('end', function(){ 
            gutil.log(gutil.colors.green("All Compled. Bundling...")); 
        }); 
        bundleStream.on('finish', function(){ 
            gutil.log(gutil.colors.green("All Bundled.")); 
        });
            
        return bundleStream;
    }

gulp.task('default', function(){
    connect.server({
        port: 8080,
        livereload: true
    });
    
    build();
    
    watch(files.scripts, build);
});