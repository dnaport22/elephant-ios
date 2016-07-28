/**
 * @file
 *
 * Manages the configuration settings for the Gulp task runner.
 */

'use strict';

// Gulp modules and general variables.
var gulp = require('gulp');
var sass = require('gulp-sass');
var sassdoc = require('sassdoc');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var sassLint = require('gulp-sass-lint');

// Specify the patterns of files to watch / compile.
var globs = {
    sass:     'sass/**/*.scss'
};

/**
 * Gulp task: Sass
 * Processes our Sass .scss files into CSS, and also handles creation
 * of CSS sourcemaps for better dev tools debugging.
 */
gulp.task('sass', function() {
    return gulp.src(globs.sass)
        .pipe(sourcemaps.init())
    .pipe(sass({
        outputStyle: 'compressed',
        errLogToConsole: true
    }))
    .on('error', function (error) {
        console.error('Error!', error.message);
        this.emit('end');
    })
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('css/'));
});


/**
 * Gulp task: Sasslint
 * Not part of our normal sass chain as it slows the process down, this lints the sass files based on the options in
 * .sass-lint.yml
 */
gulp.task('sass-lint', function() {
    return gulp.src(globs.sass)
    .pipe(sassLint({
            config: './.sass-lint.yml'
        }))
          .pipe(sassLint.format())
          .pipe(sassLint.failOnError())
});  // End if (includeSasslint)
 // End if (includeSass)

/**
 * Gulp task: Sassdoc
 * Rebuilds our sass documentation.
 */
gulp.task('sassdoc', function () {
    gulp.src(globs.sass)
    .pipe(sassdoc({
        dest: 'sassdoc'
    }));
});

/**
 * Gulp task: [default]
 * Watches our files for changes.
 */
gulp.task('default', null, function() {
    

    // Watch our files, run tasks on changes.
    gulp.watch(globs.sass, ['sass']);
});
