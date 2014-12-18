var gulp = require('gulp');
var usemin = require('gulp-usemin');
var uglify = require('gulp-uglify');
var minifyHtml = require('gulp-minify-html');
var minifyCss = require('gulp-minify-css');
var rev = require('gulp-rev');
var connect = require('gulp-connect');
var watch = require('gulp-watch');
var path = require('path');

gulp.task('usemin', function () {
	return gulp.src('./index.html')
		.pipe(usemin({
			css: [minifyCss(), 'concat', rev()],
			html: [minifyHtml({empty: true})],
			js: [uglify(), rev()]
		}))
		.pipe(gulp.dest('build/'));
});

gulp.task('images', function(){
	gulp.src('./images/**')
		.pipe(gulp.dest('./build/images'));
});

gulp.task('build', ['usemin', 'images'], function(){});

gulp.task('live', ['connect'], function() {
	return watch(['css/*.css', 'js/*.js', 'index.html'])
		.pipe(connect.reload());
});

gulp.task('connect', function() {
	connect.server({
		livereload: true,
		port: 8000,
		root: path.resolve('./')
	});
});

gulp.task('default', function(){
	console.log('Hello from Gulp');
});