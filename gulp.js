var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer');
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    del = require('del')
    browserify = require('gulp-browserify'),
    compass = require('gulp-compass'),
    plumber = require('gulp-plumber');

gulp.task('browserify', function() {
    // Single point of entry (make sure not to src ALL your files, browserify will figure it out for you)
    gulp.src(['assets/js/main.js'])
        .pipe(plumber())
        .pipe(browserify({
            insertGlobals : true
        } ) )
        .pipe(uglify())
        .pipe(rename('public/js/bundle.min.js'))
        .pipe(gulp.dest('./'))
        .pipe(notify({ message: 'browserify task complete' }));
});

gulp.task('styles', function() {
    gulp.src('assets/sass/main.scss')
        .pipe(plumber())
        .pipe(compass({
            css: 'public/css',
            sass: 'assets/sass',
            image: 'assets/images',
            require: ['susy', 'breakpoint', 'bourbon']
        }))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest('public/css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest('public/css'))
        .pipe(notify({ message: 'Styles task complete' }));
});

gulp.task('watch', function() {

    // Watch .scss files
    gulp.watch('assets/sass/**/*.scss', ['styles']);

    // Watch .js files
    gulp.watch('assets/js/**/*.js', ['browserify']);

});

gulp.task('default', ['watch']);

