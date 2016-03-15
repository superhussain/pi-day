var gulp = require('gulp');

// plugins
var uglify = require('gulp-uglify'),
    stylus = require('gulp-stylus'),
    livereload = require('gulp-livereload'),
    imagemin = require('gulp-imagemin'),
    prefix = require('gulp-autoprefixer'),
    serve = require('gulp-webserver');

// error log
function errorLog(error) {
  console.error.bind(error);
  this.emit('end');
}

// ### TASKS ###################

// scripts task
gulp.task('scripts', function() {
  gulp.src('js/*.js')
  .pipe(uglify())
  .on('error', errorLog)
  .pipe(gulp.dest('js/build'));
});

// styles task
gulp.task('styles', function() {
  // return stylus('styl/*.styl')
  // .pipe(stylus({
  //   compress: true
  // }))
  gulp.src('css/*.css')
  .on('error', errorLog)
  .pipe(prefix('last 7 versions'))
  .pipe(gulp.dest('css'))
  .pipe(livereload());
});

// image task
gulp.task('image', function() {
  gulp.src('img/*')
  .pipe(imagemin())
  .pipe(gulp.dest('img'));
});

// serve task
gulp.task('serve', function() {
  gulp.src('./')
    .pipe(serve({
      livereload: {
        enable: true,
        filter: function(fileName) {
          if (fileName.match(/.map$/)) { // exclude all source maps from livereload
            return false;
          } else {
            return true;
          }
        }
      },
      directoryListing: false,
      open: true,
      path: '/'
    }));
});

// deploy task
gulp.task('deploy', function() {
  gulp.src('./')
    .pipe(serve({
      port: '80',
      directoryListing: false,
      open: true,
      path: '/'
    }));
});

// watch task
gulp.task('watch', function() {
  var server = livereload();

  gulp.watch('js/*.js', ['scripts']);
  gulp.watch('styl/**/*', ['styles']);
});

// default task
gulp.task('default', ['scripts', 'styles', 'serve', 'watch']);
