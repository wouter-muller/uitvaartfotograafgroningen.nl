var gulp = require("gulp"),
  sass = require("gulp-sass"),
  autoprefixer = require("gulp-autoprefixer"),
  // uglify = require('gulp-uglify'),
  minify = require("gulp-minify"),
  imagemin = require("gulp-imagemin"),
  rename = require("gulp-rename"),
  concat = require("gulp-concat"),
  sourcemaps = require("gulp-sourcemaps"),
  // notify = require('gulp-notify'),
  cache = require("gulp-cache"),
  livereload = require("gulp-livereload"),
  include = require("gulp-include"),
  del = require("del"),
  magicImporter = require("node-sass-magic-importer");

// ----------------------------------------------------------------------------
// CSS
// ----------------------------------------------------------------------------

gulp.task("css", function() {
  return gulp
    .src("src/styles/main.sass")
    .pipe(sass({ style: "expanded", importer: magicImporter() }))
    .pipe(autoprefixer("last 2 version"))
    .pipe(gulp.dest("/css"));
});

// ----------------------------------------------------------------------------
// Javascript
// ----------------------------------------------------------------------------

gulp.task("js", function() {
  return gulp
    .src("src/scripts/**/*.js")
    .pipe(concat("bundle.js"))
    .pipe(gulp.dest("/js"));
});

// ----------------------------------------------------------------------------
// Images
// ----------------------------------------------------------------------------

gulp.task("img-all", function() {
  return gulp
    .src("src/img/**/*")
    .pipe(
      imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })
    )
    .pipe(gulp.dest("img"));
  //.pipe(notify({ message: 'Images task complete' }));
});

gulp.task("img-new", function() {
  return gulp
    .src("src/images/**/*")
    .pipe(
      cache(
        imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })
      )
    )
    .pipe(gulp.dest("img"));
  //.pipe(notify({ message: 'Images task complete' }));
});

// ----------------------------------------------------------------------------
// Clean/remove all compiled assets
// ----------------------------------------------------------------------------

gulp.task("clean", function() {
  return del(["src/css", "src/js", "src/images"]);
});

// ----------------------------------------------------------------------------
// Run all
// ----------------------------------------------------------------------------

gulp.task("all", ["clean"], function() {
  gulp.start("css", "js", "img-new");
});

// ----------------------------------------------------------------------------
// Watchers
// ----------------------------------------------------------------------------

gulp.task("watch", function() {
  gulp.watch("src/styles/**/*.*", ["css"]);
  gulp.watch("src/scripts/**/*.js", ["js"]);
  gulp.watch("src/img/**/*", ["img-new"]);

  // Create LiveReload server
  livereload.listen();

  gulp.watch(["src/**/*"]).on("change", livereload.changed);
});
