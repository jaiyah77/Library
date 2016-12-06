'use strict';

import gulp from 'gulp';
import sass from 'gulp-sass';
import imagemin  from 'gulp-imagemin';
import sourcemaps from 'gulp-sourcemaps';
import FileCache from 'gulp-file-cache';
import gulpWebpack from 'gulp-webpack';
import webpack from 'webpack';

const cache = new FileCache();

const projectName = 'horizontalBox2';
const path = {
	webpack: {
		src: __dirname + `/${projectName}/src/js/app.js`,
		dist: __dirname + `/${projectName}/res/js`
	},
	sass: {
		src: __dirname + `/${projectName}/src/sass/**/*.scss`,
		dist: __dirname + `/${projectName}/res/css`
	},
	imagemin: {
		src: __dirname + `/${projectName}/src/images/*.+(png|jpg|gif|jpeg)`,
		dist: __dirname + `/${projectName}/res/images`
	}
};

/**
 * sass
 */
let outputStyle = 'compressed';
gulp.task('sass', () =>{
	return gulp.src(path.sass.src)
		.pipe(cache.filter())
		.pipe(sourcemaps.init())
		.pipe(sass({outputStyle: outputStyle}).on('error', sass.logError))
		.pipe(cache.cache())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(path.sass.dist));
});

/**
 * image min
 */
gulp.task('imagemin', () =>{
	return gulp.src(path.imagemin.src)
		.pipe(cache.filter())
		.pipe(imagemin({
			// progressive: true,
			// optimizationLevel: 7
		}))
		.pipe(cache.cache())
		.pipe(gulp.dest(path.imagemin.dist));
});

/**
 * webpack
 */
gulp.task('webpack', () =>{
	return gulp.src(path.webpack.src)
		.pipe(cache.filter())
		.pipe(gulpWebpack({
			devtool: 'source-map',
			entry: {
				app: path.webpack.src
			},
			output: {
				filename: '[name].js',
			},
			module: {
				loaders: [
					{
						test: /\.js$|\.jsx$/,
						loader: 'babel-loader',
						exclude: 'node_modules'
					}
				]
			},
			plugins: [
				new webpack.optimize.UglifyJsPlugin()
			]
		}))
		.pipe(cache.cache())
		.pipe(gulp.dest(path.webpack.dist));
});

/**
 * watch
 */
gulp.task('watch', () =>{
	gulp.watch(path.webpack.src, ['webpack']);
	gulp.watch(path.sass.src, ['sass']);
});

/**
 * default
 */
gulp.task('default', ['webpack', 'sass', 'watch']);