var gulp = require('gulp')
var pug = require('gulp-pug')
var sass = require('gulp-sass')
var concat = require('gulp-concat')
var uglify = require('gulp-uglify')
var browserSync = require('browser-sync').create()

// Compile pug files into HTML
function html() {
  return gulp.src('src/pug/*.pug')
    .pipe(pug())
    .pipe(gulp.dest('dist'))
}

// Compile sass files into CSS
function styles() {
  return gulp.src('src/sass/main.sass')
    .pipe(sass({
      includePaths: ['src/sass'],
      errLogToConsole: true,
      outputStyle: 'compressed',
      onError: browserSync.notify
    }))
    .pipe(gulp.dest('dist/assets/css'))
    .pipe(browserSync.stream())
}

// Scripts
function scripts() {
  return gulp.src([
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/typed.js/lib/typed.min.js',
    'src/js/**/*.js'
  ])
  .pipe(concat('script.js'))
  .pipe(uglify())
  .pipe(gulp.dest('dist/assets/js'))
  .pipe(browserSync.stream())
}

// Copy assets
function assets() {
  return gulp.src('src/assets/**')
    .pipe(gulp.dest('dist/assets'))
}

// Serve and watch sass/pug files for changes
function watchAndServe() {
  browserSync.init({
      server: 'dist'
  }),

  gulp.watch('src/sass/**/*.sass', styles)
  gulp.watch('src/pug/*.pug', html)
  gulp.watch('src/assets/**/*', assets)
  gulp.watch('src/js/**/*', scripts)
  gulp.watch('dist/*.html').on('change', browserSync.reload)
}

exports.html = html
exports.styles = styles
exports.scripts = scripts
exports.watch = watchAndServe
exports.default = gulp.series(html, styles, scripts, assets, watchAndServe)
