var gulp = require('gulp')
var less = require('gulp-less')
var cssmin = require('gulp-cssmin')
var uglify = require('gulp-uglify')

var paths = {
    css: {
        src: './src/css/',
        dest: './public/css/'
    },
    js: {
        src: './src/js',
        dest: './public/js/'
    },
    bower: './bower_components/'
}

gulp.task('build-css', function () {
    return gulp.src(paths.css.src + '*.css')
        .pipe(cssmin())
        .pipe(gulp.dest(paths.css.dest))
})

gulp.task('build-js', function () {
    return gulp.src(paths.js.src + '*.js')
        .pipe(uglify())
        .pipe(gulp.dest(paths.js.dest))
})

gulp.task('build', ['build-css', 'build-js'])

gulp.task('default', ['build'])