const {src, dest, watch, parallel} = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const plumber = require('gulp-plumber')
const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')
const postcss = require('gulp-postcss') 
const sourcemaps = require('gulp-sourcemaps')

const terser = require('gulp-terser-js')

const scssDir = 'src/scss/**/*.scss'
const imgsDir = 'img/**/*.{png,jpg}'
const jsDir = 'src/js/**/*.js'

const buildDirs = {
    imgs: 'build/img',
    js: 'build/js',
    css: 'build/css',
    html: 'build'
}

const cache = require('gulp-cache')
const webp = require('gulp-webp')
const imagemin = require('gulp-imagemin') 
const avif = require('gulp-avif')

putHTML = async ()=>{
    await src('index.html')
    .pipe(dest(buildDirs.html))
} 

sassToCss = async ()=>{
    //directorio sass
    await src(scssDir)
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(sass())
    .pipe( postcss([cssnano(), autoprefixer()]) )
    .pipe(sourcemaps.write('.'))
    .pipe(dest('src/css'))
    .pipe(dest(buildDirs.css))
}

turnWebp = async()=>{

    await src(imgsDir)
    .pipe(webp({
        quality: 50
    }))
    .pipe(dest(buildDirs.imgs))
}

compressImages = async ()=>{
   await src(imgsDir)
    .pipe(cache(imagemin({
        optimizationLevel: 3
    })))
    .pipe(dest(buildDirs.imgs))
}

turnAvif = async ()=>{
    await src(imgsDir)
    .pipe(avif({
        quality: 50
    }))
    .pipe(dest(buildDirs.imgs))
}
jsCompress = async()=>{
    await src(jsDir)
        .pipe(sourcemaps.init())
        .pipe(terser())
        .pipe(sourcemaps.write('.'))
        .pipe(dest(buildDirs.js))
}
deve = async ()=>{
   await watch(scssDir, sassToCss)
   await watch(jsDir,jsCompress)
   await watch('index.html', putHTML)
}

exports.sassToCss = sassToCss
exports.jsCompress = jsCompress
exports.turnWebp = turnWebp
exports.turnAvif = turnAvif
exports.compressImages = compressImages
exports.dev = parallel(compressImages, turnAvif, turnWebp, deve)