var gulp = require('gulp')
var babel = require('gulp-babel')
var browserSync = require('browser-sync')
var sass = require('gulp-sass')
var sourcemaps = require('gulp-sourcemaps')
var concat = require('gulp-concat')
var reload = browserSync.reload
const autoprefixer = require('gulp-autoprefixer')
const browserify = require('browserify')
var source = require('vinyl-source-stream')
var buffer = require('vinyl-buffer')
var globby = require('globby')
var through = require('through2')
var gutil = require('gulp-util')
var uglify = require('gulp-uglify')
var reactify = require('reactify')
var combiner = require('stream-combiner2')

// 默认任务
gulp.task('default', ['babel', 'sass', 'serve', 'autoprefixer', 'javascript', 'watch', 'test'], function () {

})

// ES6编译成ES5
gulp.task('babel', function () {
  return gulp.src('app/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(concat('index.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/js'))
})

// 编译sass
gulp.task('sass', function () {
  return gulp.src('./app/styles/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/styles/'))
    .pipe(reload({ stream: true }))
})

// 监视文件改动并重新载入
gulp.task('serve', function () {
  browserSync({
    server: {
      baseDir: 'dist'
    }
  })
})

// 自动加入css兼容前缀
gulp.task('autoprefixer', function () {
  gulp.src('./dist/styles/index.css')
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('./dist/styles'))
})

gulp.task('javascript', function () {
  var b = browserify({
    entries: 'dist/js/index.js'
  })

  return b.bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('dist/js'))
})

gulp.task('watch', function () {
  gulp.watch('./app/styles/*.scss', ['sass'])
  gulp.watch('app/**/*.js', ['babel', 'javascript'])
  gulp.watch(['*.html', '*.css', 'js/**/*.js'], { cwd: 'app' }, reload)
})

gulp.task('test', function () {
  var combined = combiner.obj([
    gulp.src('app/js/*.js'),
    uglify(),
    gulp.dest('app/js')
  ])

  // 任何在上面的 stream 中发生的错误，都不会抛出，
  // 而是会被监听器捕获
  combined.on('error', console.error.bind(console))

  return combined
})
