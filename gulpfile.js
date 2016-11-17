var gulp        = require('gulp'),
    bower       = require('gulp-bower'),
    wiredep     = require('wiredep').stream,
    browserSync = require('browser-sync').create(),
    sass        = require('gulp-sass');

gulp.task('browser-sync', ['sass'], function() {
    browserSync.init({
        server: "./app",
        notify: false,
        port: 8080,
        ui: {
            port: 8081
        }
    });
});

gulp.task('bower', function() {
    return bower();
});

gulp.task('bower-inject', ['bower'], function () {
    gulp.src('./app/index.html')
    .pipe(wiredep({
        optional: 'configuration',
        goes: 'here'
    }))
    .pipe(gulp.dest('./app'));
});

gulp.task('sass', function() {
    return gulp.src("app/scss/*.scss")
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest("app/css"))
        .pipe(browserSync.stream());
});

gulp.task('watch', ['bower', 'browser-sync'], function(){
    gulp.watch("app/scss/**/*.scss", ['sass']);
    gulp.watch("bower.json", ['bower-inject']);
    gulp.watch("app/js/*.js").on('change', browserSync.reload);
    gulp.watch("app/*.html").on('change', browserSync.reload);
});

gulp.task('default', ['watch']);