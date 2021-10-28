var gulp = require("gulp"),
    sass = require('gulp-sass')(require('sass')),
    postcss = require("gulp-postcss"),
    autoprefixer = require("autoprefixer"),
    cssnano = require("cssnano"),
    sourcemaps = require("gulp-sourcemaps");

// Put this after including our dependencies
var paths = {
    styles: {
        src: "sass/**/*.scss",
        dest: "public/css"
    },
    dest: {
        styles : {
            src: "sass/**/*.scss",
            dest: "dist/css"
        },
        images : {
            src: "public/images/**/*.+(png|jpg|gif|ico|svg|webp)",
            dest: "dist/images"
        }
    }
};

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

function destImage(){
    return (
        gulp
            .src(paths.dest.images.src)
            .pipe(gulp.dest(paths.dest.images.dest))
    );
}

exports.style = style;
exports.destImage = destImage;

function watch() {
    style();
    destImage();
    gulp.watch(paths.styles.src, style);
}

exports.watch = watch
