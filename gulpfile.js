const { src, dest, watch, parallel } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const plumber = require("gulp-plumber");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const postcss = require("gulp-postcss");
const sourcemaps = require("gulp-sourcemaps");

const terser = require("gulp-terser-js");

const scssDir = "src/scss/**/*.scss";
const imgsDir = "src/assets/img/**/*.{png,jpg}";
const videoDir = "src/assets/video/**/*.{mp4,ogg,webm}";
const jsDir = "src/js/**/*.js";

const buildDirs = {
  video: "build/video",
  imgs: "build/img",
  js: "build/js",
  css: "build/css",
  html: "build",
};

const cache = require("gulp-cache");
const webp = require("gulp-webp");
const imagemin = require("gulp-imagemin");
const avif = require("gulp-avif");

putHTML = (cb)=>{
  src("src/index.html").pipe(dest(buildDirs.html));
  cb();
};

putVideo = (cb)=>{
  src(videoDir).pipe(dest(buildDirs.video));
  cb();
};

sassToCss = (cb)=>{
  src(scssDir)
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([cssnano(), autoprefixer()]))
    .pipe(sourcemaps.write("."))
    .pipe(dest("src/css"))
    .pipe(dest(buildDirs.css));
    cb();
};

turnWebp = (cb)=>{
  src(imgsDir)
    .pipe(
      webp({
        quality: 50,
      })
    )
    .pipe(dest(buildDirs.imgs));
    cb();
};

compressImages = (cb)=>{
  src(imgsDir)
    .pipe(
      cache(
        imagemin({
          optimizationLevel: 3,
        })
      )
    )
    .pipe(dest(buildDirs.imgs));
    cb();
};

turnAvif = (cb)=>{
  src(imgsDir)
    .pipe(
      avif({
        quality: 50,
      })
    )
    .pipe(dest(buildDirs.imgs));
    cb();
};
jsCompress = (cb)=>{
  src(jsDir)
    .pipe(sourcemaps.init())
    .pipe(terser())
    .pipe(sourcemaps.write("."))
    .pipe(dest(buildDirs.js));
    cb();
};
devIn = (cb)=>{
  watch(scssDir, sassToCss);
  watch(jsDir, jsCompress);
  watch("src/index.html", putHTML);
  cb();
};

exports.sassToCss = sassToCss;
exports.jsCompress = jsCompress;
exports.turnWebp = turnWebp;
exports.turnAvif = turnAvif;
exports.compressImages = compressImages;
exports.dev = parallel(compressImages, turnAvif, turnWebp, devIn, putVideo);
