var gulp = require('gulp'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    minifyCSS = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    order = require("gulp-order"),
    jsx = require('gulp-jsx');

gulp.task('default', ['html', 'jsx', 'js', 'sass', 'watch']);

gulp.task('js', function() {
    var jsDir = "";
    gulp
        .src(['src/**/app.js', 'src/**/*.js', 'src/**/**/*.js'])
        .pipe(rename(function(path) {
            jsDir = path.dirname;
        }))
        .pipe(order([
            'src/**/app.js'
        ]))
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/'+ jsDir));
});

gulp.task('sass', function() {
    gulp
        .src('src/scss/styles.scss')
        .pipe(sass())
        .pipe(minifyCSS({keepBreaks: false}))
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

gulp.task('jsx', function () {
  gulp
      .src(['src/**/app.jsx', 'src/**/*.jsx', 'src/**/**/*.jsx'])
      .pipe(jsx())
      .pipe(order([
          'src/**/app.jsx'
      ]))
      .pipe(concat('app.js'))
      .pipe(uglify())
      .pipe(gulp.dest('./dist/reactjs/'));
});

gulp.task('watch', function() {
    gulp.watch(['src/*/*.jsx', 'src/*/*/*.jsx'], ['jsx']);
    gulp.watch(['src/*/*.js', 'src/*/*/*.js'], ['js']);
    gulp.watch(['src/scss/*.scss', 'src/scss/*/*.scss'], ['sass']);
    gulp.watch(['src/*.html', 'src/*/*.html'], ['html']);
});
