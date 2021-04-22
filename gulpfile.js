'use strict';

const gulp = require('gulp');
const del = require('del');

function deletePublic() {
    return del('public');
}

function copyFiles() {
    return gulp
        .src(['src/**/*', '!src/js/**/*'], {
            base: 'src'
        })
        .pipe(gulp.dest('public'));
}

const copyAssets = gulp.series(deletePublic, copyFiles);

exports.copyAssets = copyAssets;
