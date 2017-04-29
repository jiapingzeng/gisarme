var gulp = require('gulp')
var gulpif = require('gulp-if')
var cssmin = require('gulp-cssmin')
var sass = require('gulp-sass')
var uglify = require('gulp-uglify')

var paths = {
    css: {
        src: './src/css/',
        dest: './public/css/'
    },
    js: {
        src: './src/js/',
        dest: './public/js/'
    },
    bower: './bower_components/'
}

gulp.task('build-css', function () {
    return gulp.src(paths.css.src + '*')
        .pipe(gulpif("*.scss", sass()))
        .pipe(cssmin())
        .pipe(gulp.dest(paths.css.dest))
})

gulp.task('build-js', function () {
    return gulp.src(paths.js.src + '*')
        .pipe(uglify())
        .pipe(gulp.dest(paths.js.dest))
})

gulp.task('build', ['build-css', 'build-js'])

gulp.task('default', ['build'])