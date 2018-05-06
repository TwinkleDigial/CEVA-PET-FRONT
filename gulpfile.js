// --------------------------------------------------------------------
// Plugins
// --------------------------------------------------------------------

const gulp            = require('gulp')
const babel           = require('gulp-babel')
const connect         = require('gulp-connect-php')
const browserSync     = require('browser-sync')
const sass            = require('gulp-sass')
const cssnano         = require('gulp-cssnano')
const uglify          = require('gulp-uglify')
const ignore          = require('gulp-ignore')
const inject          = require('gulp-inject')
const bowerFiles      = require('main-bower-files')
const es              = require('event-stream')
const pump            = require('pump')

// --------------------------------------------------------------------
// SASS
// --------------------------------------------------------------------

gulp.task('sass', function() {
  return gulp.src("./sass/main.sass")
             .pipe(sass({indentedSyntax: true}))
             .pipe(sass().on('error', sass.logError))
             .pipe(gulp.dest("./css"))
             .pipe(browserSync.stream());
});

// --------------------------------------------------------------------
// CSS MINIFY
// --------------------------------------------------------------------

gulp.task('cssnano', function(){
  return gulp.src('./css/main.css')
             .pipe(cssnano())
             .pipe(gulp.dest('./build/css/'));
});

// --------------------------------------------------------------------
// JS MINIFY
// --------------------------------------------------------------------

gulp.task('uglify', function (cb) {
  pump([
        gulp.src(['./js/*.js']),
        babel(),
        uglify(),
        gulp.dest('./build/js/')
    ],
    cb
  );
});

// --------------------------------------------------------------------
// GULP WATCH
// --------------------------------------------------------------------

gulp.task('minify', function(){
  gulp.watch(['./sass/**/*.sass', './sass/*.sass', '!./build'], {intervel: 750}, ['sass']);
  gulp.watch(['./js/*.js', '!./build'], {intervel: 750}, ['inject']);
  gulp.watch('./css/main.css', {intervel: 750}, ['cssnano', 'inject']);
})

gulp.task('reload', ['minify'], function(){
  
  // IF TEMPLTES CHANGE
  gulp.watch(['./index.html', './*.html', './views/**/*.html'], {intervel: 750}).on('change', function () {
    browserSync.reload();
  });

  // IF STYLE/JS CHANGE
  gulp.watch(['./js/*.js','./css/*.css'], {intervel: 750}).on('change', function () {
    browserSync.reload();
  });
})

// --------------------------------------------------------------------
// GULP INJECT
// --------------------------------------------------------------------


var cssFiles = gulp.src(['./css/*.css', './lib/mdi/css/materialdesignicons.min.css']);
var jsFiles = gulp.src(['./js/*.js', './lib/tinymce/tinymce.min.js']);

gulp.task('inject', function () {
  return gulp.src('./index.html')
    .pipe(inject(gulp.src(bowerFiles({
      paths: {
        bowerDirectory: './lib',
        bowerrc: './.bowerrc',
        bowerJson: './bower.json'
      }
    }), {read: false}), {name: 'bower'}))
    .pipe(inject(es.merge(
      cssFiles,
      jsFiles
    )))
    .pipe(gulp.dest('./'))
});

// --------------------------------------------------------------------
// GULP SERVE
// --------------------------------------------------------------------

gulp.task('serve', ['reload'], function() {

  connect.server({}, function (){
    browserSync({
      open: false,
      proxy: "127.0.0.1:8000"
    });
  });

  
});

gulp.task('build', ['minify', 'inject'])