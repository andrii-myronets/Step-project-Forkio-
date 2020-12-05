const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const clean = require('gulp-clean');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const minifyjs = require('gulp-js-minify');
const uglify = require('gulp-uglify');
const cleancss = require('gulp-clean-css');
const autopref = require('gulp-autoprefixer');
const minimage = require('gulp-imagemin');


function upServer(){
  browserSync.init({
    server:{
      baseDir:'./'
    }
    // ,
    // host: '192.168.50.50'

  });
}

function cleanStyle(){
  return gulp.src('dist/css/*')
      .pipe(clean());
};

function buildSass(){
  return gulp.src('src/scss/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(concat('src/scss/*.scss'))
      .pipe(rename('my.css'))
      .pipe(gulp.dest('src/css'));
};

function buildFinalCss(){
  return gulp.src('src/css/**/*.css')
      // .pipe(concat('my.css'))
      .pipe(autopref({
        // overrideBrowserslist:['last 2 versions'],
        cascade: true
      }))
      // .pipe(cleancss())
      .pipe(gulp.dest('dist/css'));
};

function buildJS(){
  return gulp.src('src/js/**/*.js')
      // .pipe(concat())
      // .pipe(rename('scripts.js'))
      .pipe(minifyjs())
      .pipe(uglify())
      .pipe(gulp.dest('dist/js'));
}

function minImages(){
  return gulp.src('src/img/**/*.*')
      .pipe(minimage())
      .pipe(gulp.dest('dist/img'))
};

function replaceFonts(){
  return gulp.src('src/fonts/**/*.*')
      .pipe(gulp.dest('dist/fonts'))
};

function changeHTML(){
  return gulp.src('*.html')
      .pipe(gulp.dest('dist/'))
};


function watchFiles() {
  gulp.watch('src/scss/**/*.scss', gulp.series(/*cleanStyle,*/ buildSass, buildFinalCss)).on('change',browserSync.reload);
  // gulp.watch('dist/fonts/**/*.*', gulp.series(replaceFonts)).on('change', browserSync.reload);
  gulp.watch("*.html", gulp.series(changeHTML, /*cleanStyle,*/ buildSass, buildFinalCss)).on('change', browserSync.reload);
  gulp.watch('src/js/**/*.js', buildJS).on('change', browserSync.reload);
  gulp.watch('src/img/**/*.*', minImages);

};

exports.script = buildJS;

exports.fonts = replaceFonts;

exports.mainHTML = changeHTML;

exports.img = minImages;

exports.server = upServer;

exports.watch = watchFiles;

exports.default = gulp.parallel(exports.mainHTML, exports.fonts, buildSass,buildFinalCss , exports.script, exports.server, exports.watch);

