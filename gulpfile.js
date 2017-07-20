var gulp = require('gulp')
var gulpif = require('gulp-if')
var concat = require('gulp-concat')
var cssmin = require('gulp-cssmin')
var less = require('gulp-less')
var merge = require('merge-stream')
var plumber = require('gulp-plumber')
var rename = require('gulp-rename')
var run = require('run-sequence')
var sass = require('gulp-sass')
var sync = require('browser-sync')
var uglify = require('gulp-uglify')

var paths = {
  src: {
    css: './src/css/',
    img: './src/img/',
    js: './src/js/',
    root: './src/'
  },
  dest: {
    css: './public/css/',
    img: './public/img/',
    fonts: './public/fonts/',
    js: './public/js/',
    root: './public/'
  },
  bower: './bower_components/'
}

var sources = {
  css: [{
    name: 'animate.css',
    paths: [ paths.bower + 'animate.css/animate.min.css' ]
  }, {
    name: 'bootstrap.css',
    paths: [ paths.bower + 'bootstrap/less/bootstrap.less' ]
  }, {
    name: 'flexslider.css',
    paths: [ paths.bower + 'flexslider/flexslider.less' ]
  }, {
    name: 'font-awesome.css',
    paths: [ paths.bower + 'font-awesome/less/font-awesome.less' ]
  }, {
    name: 'magnific-popup.css',
    paths: [ paths.bower + 'magnific-popup/dist/magnific-popup.css' ]
  }, {
    name: 'materialize.css',
    paths: [ paths.bower + 'materialize/dist/css/materialize.min.css' ]
  }, {
    name: 'gnoter.css',
    paths: [ paths.src.css + 'gnoter.scss' ]
  }, {
    name: 'sudokuduel.css',
    paths: [ paths.src.css + 'sudokuduel.scss' ]
  }, {
    name: 'site.css',
    paths: [
      paths.src.css + 'style.scss',
      paths.src.css + 'sky-forms.css',
      paths.src.css + 'site.scss'
    ]
  }],
  fonts: [{
    path: paths.bower + 'font-awesome/**/*.{ttf,svg,woff,woff2,otf,eot}',
    dir: '/'
  }, {
    path: paths.bower + 'materialize/dist/**/*.{ttf,svg,woff,woff2,otf,eot}',
    dir: 'roboto/'
  }],
  js: [{
    name: 'bootstrap.js',
    paths: [ paths.bower + 'bootstrap/dist/js/bootstrap.min.js' ]
  }, {
    name: 'jquery.js',
    paths: [
      paths.bower + 'jquery/dist/jquery.min.js',
      paths.bower + 'jquery.stellar/jquery.stellar.min.js',
      paths.bower + 'jquery-sticky/jquery.sticky.js',
      paths.bower + 'flexslider/jquery.flexslider-min.js',
      paths.bower + 'magnific-popup/dist/jquery.magnific-popup.min.js',
    ]
  }, {
    name: 'materialize.js',
    paths: [ paths.bower + 'materialize/dist/js/materialize.min.js' ]
  }, {
    name: 'sweetalert.js',
    paths: [ paths.bower + 'sweetalert/dist/sweetalert.min.js' ]
  }, {
    name: 'socket.io.js',
    paths: [ paths.bower + 'socket.io-client/dist/socket.io.slim.js' ]
  }, {
    name: 'wow.js',
    paths: [ paths.bower + 'wow/dist/wow.min.js' ]
  }, {
    name: 'gnoter.js',
    paths: [ paths.src.js + 'gnoter.js' ]
  }, {
    name: 'sudokuduel.js',
    paths: [ paths.src.js + 'sudokuduel.js' ]
  }, {
    name: 'site.js',
    paths: [
      paths.src.js + 'custom.js',
      paths.src.js + 'site.js'
    ]
  }]
}

gulp.task('sync', function() {
  sync.init({
    proxy: 'http://localhost:3000/'
  })
})

gulp.task('watch', ['sync'], function() {
  gulp.watch('views/**/*.pug', sync.reload)
  gulp.watch(paths.src.css + '**/*', function() {
    run('build-css', sync.reload)
  })
  gulp.watch(paths.src.js + '**/*', function() {
    run('build-js', sync.reload)
  })
})

gulp.task('build-css', function () {
  var tasks = sources.css.map(function(src) {
    return gulp.src(src.paths)
      .pipe(plumber())
      .pipe(gulpif('**/*.less', less()))
      .pipe(gulpif('**/*.scss', sass()))
      .pipe(concat(src.name))
      .pipe(cssmin())
      .pipe(gulp.dest(paths.dest.css))
  })
  return merge(tasks)
})

gulp.task('build-js', function () {
  var tasks = sources.js.map(function(src) {
    return gulp.src(src.paths)
      .pipe(plumber())
      .pipe(concat(src.name))
      .pipe(uglify())
      .pipe(gulp.dest(paths.dest.js))
  })
  return merge(tasks)
})

gulp.task('copy-fonts', function() {
  var tasks = sources.fonts.map(function(src) {
    return gulp.src(src.path)
      .pipe(plumber())
      .pipe(rename(function(path) { path.dirname = '' }))
      .pipe(gulp.dest(paths.dest.fonts + src.dir))
  })
})

gulp.task('copy-img', function() {
  return gulp.src(paths.src.img + '*')
    .pipe(plumber())
    .pipe(gulp.dest(paths.dest.img))
})

gulp.task('copy-favicon', function() {
  return gulp.src(paths.src.root + 'favicon.ico')
    .pipe(plumber())
    .pipe(gulp.dest(paths.dest.root))
})

gulp.task('build', ['build-css', 'build-js', 'copy-fonts', 'copy-img', 'copy-favicon'])

gulp.task('default', ['build'])