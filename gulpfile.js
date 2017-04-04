var gulp = require('gulp')
var less = require('gulp-less')
var cssmin = require('gulp-cssmin')
var uglify = require('gulp-uglify')

gulp.task('build-css', function () {
    return gulp.src('styles/*.css')
        .pipe(cssmin())
        .pipe(gulp.dest('public/css'))
})

gulp.task('build-js', function () {
    return gulp.src('scripts/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('public/js'))
})
    
gulp.task('default', ['build-css', 'build-js'])