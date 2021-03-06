var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var server = require('gulp-server-livereload');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var notifier = require('node-notifier');
var uglify = require('gulp-uglify');


var notify = function(error) {
  var message = 'In: ';
  var title = 'Error: ';

  if(error.description) {
    title += error.description;
  } else if (error.message) {
    title += error.message;
  }

  if(error.filename) {
    var file = error.filename.split('/');
    message += file[file.length-1];
  }

  if(error.lineNumber) {
    message += '\nOn Line: ' + error.lineNumber;
  }

  notifier.notify({title: title, message: message});
};

var bundler = watchify(browserify({
  entries: ['./public/app.jsx'],
  transform: [reactify],
  extensions: ['.jsx'],
  debug: true,
  cache: {},
  packageCache: {},
  fullPaths: true
}));

function bundle() {
  return bundler
    .bundle()
    .on('error', function(err) {
      console.log(err.message);
      this.emit('end');
    })
    .on('error', notify)
    .pipe(source('main.js'))
    .pipe(gulp.dest('./'));
}
bundler.on('update', bundle);

gulp.task('build', function() {
  bundle();
});

gulp.task('serve', function(done) {
  gulp.src('')
    .pipe(server({
      livereload: {
        enable: true,
        filter: function(filePath, cb) {
          if(/main.js/.test(filePath)) {
            cb(true);
          }
        }
      },
      open: true
    }));
});

gulp.task('default', ['build', 'serve']);
gulp.task('heroku:production', function() {
  browserify({
    entries: ['./public/app.jsx'],
    transform: [reactify],
    extensions: ['.jsx'],
    debug: false,
    cache: {},
    packageCache: {},
    fullPaths: true
  })
  .bundle()
  .pipe(source('main.js'))
  .pipe(buffer())
  .pipe(uglify())
  .pipe(gulp.dest('./'));
});
