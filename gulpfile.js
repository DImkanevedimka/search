(function() {

	"use strict";

	var gulp = require('gulp'),
		// path = require('path'),
		// concat = require('gulp-concat'),
		rename = require('gulp-rename'),
		notify = require('gulp-notify'),
		prefix = require('gulp-autoprefixer'),
		sass = require('gulp-sass'),
		// minifyCSS = require('gulp-clean-css'),
		// uglify = require('gulp-uglify'),
		del = require('del'),
		imagemin = require('gulp-imagemin'),
		pngquant = require('imagemin-pngquant'),
		cache = require('gulp-cache'),
		browserSync = require('browser-sync'),
		runSequence = require('run-sequence'),
		qcmq = require('gulp-group-css-media-queries'),
		csscomb = require('gulp-csscomb'),
		reload = browserSync.reload;

	// Paths
	var paths = {
		app  : {
			html : './app/',
			js   : './app/js/',
			scss : './app/scss/',
			css  : './app/css/',
			img  : './app/img/**/*.*',
			bower: './app/bower/',
			fonts: [
				'./app/fonts/**/*.*',
				'./app/bower/font-awesome/fonts/**.*',
				'./app/bower/slick-carousel/slick/fonts/**.*'
			]
		},
		build: {
			html : 'dist/',
			img  : 'dist/img/',
			css  : 'dist/css/',
			js   : 'dist/js/',
			fonts: 'dist/fonts/'
		},
		clean: './dist'
	};

	// Browser-Sync
	gulp.task('browserSync', function() {
		browserSync({
			server: {
				baseDir: paths.app.html
			},
			open  : true,
			notify: false
		});
	});

	//csscomb
	gulp.task('comb', function() {
		gulp.src([paths.app.scss + '*.scss'], {base: './'})
		.pipe(csscomb('./yandex.json'))
		.pipe(gulp.dest('./'));
	});

	// sass
	gulp.task('sass', function() {
		gulp.src(paths.app.scss + 'main.scss')
		.pipe(sass().on('error', notify.onError({
			message: "<%= error.message %>",
			title  : "Sass ERROR!"
		})))
		.pipe(prefix( ['last 15 version', 'safari 5', 'ie 9', 'opera 12.1', 'ios 6', 'android 4']))
		.pipe(qcmq())
		.pipe(rename("main.css"))
		.pipe(gulp.dest(paths.app.css))
		.pipe(reload({
			stream: true
		}));
	});

	// html
	gulp.task('html', function() {
		gulp.src(paths.app.html + '*.html')
		.pipe(reload({
			stream: true
		}));
	});

	// js
	gulp.task('js', function() {
		gulp.src(paths.app.js + '*.js')
		.pipe(reload({
			stream: true
		}));
	});

	// watch
	gulp.task('watch', function(callback) {
		runSequence(['browserSync', 'sass'], callback);
		gulp.watch(paths.app.scss + '**/*.scss', ['sass']);
		gulp.watch(paths.app.html + '*.html', ['html']);
		gulp.watch(paths.app.js + '*.js', ['js']);
	});

	// default
	gulp.task('default', ['watch']);


	// clean - delete 'dist' before build
	gulp.task('clean', function() {
		return del(paths.clean);
	});

	// "img"
	gulp.task('img', function() {
		return gulp.src(paths.app.img)
		.pipe(cache(imagemin({
			interlaced : true,
			progressive: true,
			svgoPlugins: [{
				removeViewBox: false
			}],
			use        : [pngquant()]
		})))
		.pipe(gulp.dest(paths.build.img));
	});


	//  "build"
	gulp.task('build', ['clean'], function(callback) {
		runSequence('img', callback);

		gulp.src(paths.app.html + '**/*.html')
		.pipe(gulp.dest(paths.build.html));

		gulp.src(paths.app.fonts)
		.pipe(gulp.dest(paths.build.fonts));
	});

	//  "clear" - clean cache for tast 'img'
	gulp.task('clear', function() {
		return cache.clearAll();
	});

})();
