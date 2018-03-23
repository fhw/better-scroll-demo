var gulp = require('gulp')
var babel = require('gulp-babel')
var browserSync = require('browser-sync')
var sass = require('gulp-sass')
var sourcemaps = require('gulp-sourcemaps')
var concat = require('gulp-concat')
var reload = browserSync.reload

gulp.task('default', ['sass', 'serve'], function () {
  return gulp.src('src/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(concat('index.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist'))
})

gulp.task('javascript', function () {
  gulp.src('src/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist'))
})

gulp.task('sass', function () {
  return gulp.src('./app/styles/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./app/styles/'))
    .pipe(reload({ stream: true }))
})

// 监视文件改动并重新载入
gulp.task('serve', function () {
  browserSync({
    server: {
      baseDir: 'app'
    }
  })
  gulp.watch('./app/styles/*.scss', ['sass'])
  gulp.watch(['*.html', '*.css', 'scripts/**/*.js'], {cwd: 'app'}, reload)
})
