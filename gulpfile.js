'use strict';

const gulp = require('gulp');
const babel = require('gulp-babel');

//paths
let paths = {
	js: {
		watch: 'src/**/*.js',
		src: 'src/jquery-bem-utils.js',
		dest: 'dist',
	}
};

gulp.task('js', () => {
	gulp.src(paths.js.src)
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(gulp.dest(paths.js.dest));
});

gulp.task('watch', function() {
	gulp.watch(paths.js.watch, ['js']);
});