const gulp = require('gulp');
const watch = require('gulp-watch');
const sass = require('gulp-sass');
const minifyCSS = require('gulp-csso');
const rename = require('gulp-rename');

// source and distribution folder
const css_source = 'src/scss/';
const css_dest = 'public/';

const js_source = 'src/js/';
const js_dest = 'public/';

// Bootstrap scss source
const bootstrapSass = {
    in: './node_modules/bootstrap/scss/'
};

// fonts
const fonts = {
    in: [css_source + 'fonts/*.*', bootstrapSass.in + 'assets/fonts/**/*'],
    out: css_dest + 'fonts/'
};

// css source file: .scss files
const scss = {
    in: css_source + 'main.scss',
    out: css_dest + 'css/',
    watch: css_source + '**/*',
    sassOpts: {
        outputStyle: 'nested',
        precison: 3,
        errLogToConsole: true,
        includePaths: [bootstrapSass.in + 'assets/stylesheets']
    }
};

// copy bootstrap required fonts to dest
gulp.task('fonts', function () {
    return gulp
        .src(fonts.in)
        .pipe(gulp.dest(fonts.out));
});

// compile scss and minify
gulp.task('sass', function () {
    return gulp.src(scss.in)
        .pipe(sass(scss.sassOpts))
        .pipe(gulp.dest(scss.out))
        .pipe(minifyCSS())
        .pipe(rename({
            extname : '.min.css'
        }))
        .pipe(gulp.dest(scss.out));
});

gulp.task('watch-sass', function(){
    gulp.watch(scss.watch, ['sass']);
});

// default task
gulp.task('default', ['sass','fonts']);

//watch for production
gulp.task('watch', ['fonts', 'watch-sass']);