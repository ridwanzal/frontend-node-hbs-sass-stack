var gulp = require("gulp"),
  handlebars = require("gulp-compile-handlebars"),
  sass = require("gulp-sass")(require("sass")),
  postcss = require("gulp-postcss"),
  autoprefixer = require("autoprefixer"),
  cssnano = require("cssnano"),
  sourcemaps = require("gulp-sourcemaps"),
  rename = require("gulp-rename");

// Put this after including our dependencies
var paths = {
  styles: {
    src: "sass/**/*.scss",
    dest: "public/css",
  },
  dest: {
    styles: {
      src: "sass/**/*.scss",
      dest: "dist/css",
    },
    images: {
      src: "public/images/**/*.+(png|jpg|gif|ico|svg|webp)",
      dest: "dist/images",
    },
    fonts: {
      src: "sass/fonts/**/*.+(woff|woff2)",
      dest: "dist/css",
    },
    html: {
      src: "views/index.hbs",
      dest: "dist",
    },
    javascript: {
      src: "public/js/**/*.js",
      dest: "dist/js",
    },
  },
};

function html() {
  (templateData = {
    header: "Welcome",
  }),
    (options = {
      ignorePartials: false, //ignores the unknown footer2 partial in the handlebars template, defaults to false
      batch: ["./views/partials"],
    });
  return gulp
    .src(paths.dest.html.src)
    .pipe(handlebars(null, options))
    .pipe(rename("index.html"))
    .pipe(gulp.dest(paths.dest.html.dest));
}

function style() {
  return (
    gulp
      .src(paths.styles.src)
      // Initialize sourcemaps before compilation starts
      .pipe(sourcemaps.init())
      .pipe(sass())
      .on("error", sass.logError)
      // Use postcss with autoprefixer and compress the compiled file using cssnano
      .pipe(postcss([autoprefixer(), cssnano()]))
      // Now add/write the sourcemaps
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(paths.styles.dest))
      .pipe(gulp.dest(paths.dest.styles.dest))
  );
}

function image() {
  return gulp
    .src(paths.dest.images.src)
    .pipe(gulp.dest(paths.dest.images.dest));
}

function fonts() {
  return gulp.src(paths.dest.fonts.src).pipe(gulp.dest(paths.dest.fonts.dest));
}

function javascript() {
  return gulp.src(paths.dest.javascript.src).pipe(gulp.dest(paths.dest.javascript.dest));
}

exports.style = style;
exports.image = image;
exports.fonts = fonts;
exports.html = html;
exports.javascript = javascript;

function watch() {
  style();
  image();
  fonts();
  html();
  javascript();
  gulp.watch(paths.styles.src, style);
}

exports.watch = watch;
