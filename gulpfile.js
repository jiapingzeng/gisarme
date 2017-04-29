var gulp = require('gulp')
var gulpif = require('gulp-if')
var concat = require('gulp-concat')
var cssmin = require('gulp-cssmin')
var less = require('gulp-less')
var merge = require('merge-stream')
var rename = require('gulp-rename')
var sass = require('gulp-sass')
var uglify = require('gulp-uglify')

var paths = {
  src: {
    css: './src/css/',
    js: './src/js/',
    root: './src/'
  },
  dest: {
    css: './public/css/',
    fonts: './public/fonts/',
    js: './public/js/',
    root: './public/'
  },
  bower: './bower_components/'
}

var sources = {
  css: [{
    name: "animate.css",
    paths: [ paths.bower + "animate.css/animate.min.css" ]
  }, {
    name: "bootstrap.css",
    paths: [ paths.bower + "bootstrap/less/bootstrap.less" ]
  }, {
    name: "flexslider.css",
    paths: [ paths.bower + "flexslider/flexslider.less" ]
  }, {
    name: "font-awesome.css",
    paths: [ paths.bower + "font-awesome/less/font-awesome.less" ]
  }, {
    name: "magnific-popup.css",
    paths: [ paths.bower + "magnific-popup/dist/magnific-popup.css" ]
  }, {
    name: "style.css",
    paths: [ paths.src.css + "style.scss" ]
  }],
  fonts: [{
    path: paths.bower + "font-awesome/**/*.{ttf,svg,woff,woff2,otf,eot}"
  }],
  js: [{
    name: "bootstrap.js",
    paths: [ paths.bower + "bootstrap/dist/js/bootstrap.min.js" ]
  }, {
    name: "jquery.js",
    paths: [
      paths.bower + "jquery/dist/jquery.min.js",
      paths.bower + "jquery.stellar/jquery.stellar.min.js",
      paths.bower + "jquery-sticky/jquery.sticky.js",
      paths.bower + "flexslider/jquery.flexslider-min.js",
      paths.bower + "magnific-popup/dist/jquery.magnific-popup.min.js",
    ]
  }, {
      name: "sweetalert.js",
      paths: [ paths.bower + "sweetalert/dist/sweetalert.min.js" ]
  }, {
      name: "wow.js",
      paths: [ paths.bower + "wow/dist/wow.min.js" ]
  }, {
      name: "custom.js",
      paths: [ paths.src.js + "custom.js"]
  }]
}

gulp.task("build-css", function () {
  var tasks = sources.css.map(function(src) {
    return gulp.src(src.paths)
      .pipe(gulpif("**/*.less", less()))
      .pipe(gulpif("**/*.scss", sass()))
      .pipe(concat(src.name))
      .pipe(cssmin())
      .pipe(gulp.dest(paths.dest.css))
  })
  return merge(tasks)
})

gulp.task('build-js', function () {
  var tasks = sources.js.map(function(src) {
    return gulp.src(src.paths)
      .pipe(concat(src.name))
      .pipe(uglify())
      .pipe(gulp.dest(paths.dest.js))
  })
  return merge(tasks)
})

gulp.task('copy-fonts', function() {
  var tasks = sources.fonts.map(function(src) {
    return gulp.src(src.path)
      .pipe(rename(function(path) { path.dirname = "" }))
      .pipe(gulp.dest(paths.dest.fonts))
  })
})

gulp.task('copy-favicon', function() {
  return gulp.src(paths.src.root + "favicon.ico")
    .pipe(gulp.dest(paths.dest.root))
})

gulp.task('build', ['build-css', 'build-js', 'copy-fonts', 'copy-favicon'])

gulp.task('default', ['build'])