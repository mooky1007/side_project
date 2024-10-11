import { src, dest, watch } from 'gulp';
import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';
import browserify from 'browserify';
import babelify from 'babelify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';

const sass = gulpSass(dartSass);

const defaultTask = (cb) => {
    src('./scss/app.scss')
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(dest('./dist'));

    browserify({
        entries: './js/main.js',
        debug: true,
    })
        .transform(babelify, { presets: ['@babel/preset-env'] })
        .bundle()
        .pipe(source('main.js'))
        .pipe(buffer())
        .pipe(dest('dist'));
    cb();
};

watch(['js/**/*', 'scss/**/*'], defaultTask);

export default defaultTask;
