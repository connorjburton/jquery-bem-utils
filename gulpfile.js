//packages
var browserify = require('browserify');

var gulp = require('gulp');
var gutil = require('gulp-util');
var uglify = require('gulp-uglify');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');

//paths
var paths = {
	js: {
		watch: 'src/**/*.js',
		src: 'src/jquery-bem.js',
		dest: 'dist',
		destFile: 'jquery-bem.js'
	}
};

gulp.task('js', function() {
	var b = browserify({
		entries: paths.js.src,
		debug: true
	}).transform('babelify', {presets: ['es2015']});

	return b.bundle()
		.pipe(source(paths.js.destFile))
		.pipe(buffer())
		.pipe(uglify())
		.on('error', gutil.log)
		.pipe(gulp.dest(paths.js.dest));
});

gulp.task('watch', function() {
	gulp.watch(paths.js.watch, ['js']);
});