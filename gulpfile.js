var gulp = require('gulp'),
    bowerFiles = require('main-bower-files'),
    inject = require('gulp-inject'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    minifyCSS = require('gulp-minify-css');

gulp.task('default', ['html', 'js', 'sass', 'watch']);

gulp.task('js', function() {
    var jsDir = "";
    gulp
        .src(['src/*/js/app.js', 'src/*/*/js/app.js'])
        .pipe(uglify())
        .pipe(rename(function(path) {
            jsDir = path.dirname;
        }))
        .pipe(gulp.dest('./dist/'+ jsDir));
});

gulp.task('sass', function() {
    gulp
        .src('src/scss/styles.scss')
        .pipe(sass())
        .pipe(minifyCSS({keepBreaks:false}))
        .pipe(gulp.dest('./dist'));
});

gulp.task('html', function() {
    var htmlDir = "";

    gulp
        .src(['src/*.html', 'src/*/*.html', 'src/*/*/*.html'])
        .pipe(rename(function(path) {
            htmlDir = path.dirname;
        }))
        .pipe(gulp.dest('./dist/' + htmlDir));
});

gulp.task('watch', function() {
    gulp.watch(['src/*/*.js', 'src/*/*/*.js'], ['js']);
    gulp.watch(['src/scss/*.scss', 'src/scss/*/*.scss'], ['sass']);
    gulp.watch(['src/*.html'], ['html']);
});
