var gulp = require('gulp'),
    bowerFiles = require('main-bower-files'),
    inject = require('gulp-inject'),
    sass = require('gulp-sass'),
    jade = require('gulp-jade'),
    uglify = require('gulp-uglify'),
    minifyCSS = require('gulp-minify-css');

gulp.task('default', ['js', 'sass', 'templates', 'watch']);

gulp.task('js', function() {
    gulp
        .src('src/js/app.js')
        .pipe(uglify())
        .pipe(gulp.dest('./dist/'));
});

gulp.task('sass', function() {
    gulp
        .src('src/scss/styles.scss')
        .pipe(sass())
        .pipe(minifyCSS({keepBreaks:false}))
        .pipe(gulp.dest('./dist'));
});

gulp.task('templates', function() {
    gulp
        .src('src/templates/index.jade')
        .pipe(jade())
        .pipe(inject(gulp.src(bowerFiles(), {read: false}), {name: 'bower'}))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('watch', function() {
    gulp.watch(['src/js/*.js', 'src/js/*/*.js'], ['js']);
    gulp.watch(['src/scss/*.scss', 'src/scss/*/*.scss'], ['sass']);
    gulp.watch(['src/templates/*.jade', 'src/templates/*/*.jade'], ['templates']);
});
