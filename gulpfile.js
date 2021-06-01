const gulp = require('gulp');
const postcss = require('gulp-postcss');
const browserSync = require('browser-sync').create();

const style = () => {
  return gulp
    .src('./src/**/*.css')
    .pipe(postcss())
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.stream());
};

const html = () => {
  return gulp.src('./src/**/*.html').pipe(gulp.dest('./dist'));
};

const watch = () => {
  style();
  html();

  browserSync.init({
    server: {
      baseDir: './dist',
    },
  });

  gulp.watch('./src/**/*.css', style);
  gulp.watch('./tailwind.config.js', style);
  gulp.watch('./src/**/*.html', () => {
    html();
    browserSync.reload();
  });
};

module.exports = { style, watch };
