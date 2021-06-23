const gulp = require('gulp');
const watch = require('gulp-watch');
const webserver = require('gulp-webserver');

function server(callback) {
    return gulp.src('build')
        .pipe(webserver({
            port: 8080,
            open: true,
            livereload: true
        }));
}

function monitorFiles(callback) {
    watch('src/**/*.html', () => gulp.series('appHTML')());
    watch('src/**/*.scss', () => gulp.series('appCSS')());
    watch('src/**/*.js', () => gulp.series('appJS')());
    watch('src/assets/imgs/**/*.*', () => gulp.series('appIMG')());

    return callback();
}

module.exports = {
    monitorFiles,
    server
}