let gulp = require('gulp');
let webpack = require('gulp-webpack');
let uglify = require('gulp-uglify');

let projectName = 'horizontalBox2';
let path = {
	project: __dirname + '/' + projectName + '/',
	js: {
		src: __dirname + '/' + projectName + '/src/app.js',
		dist: __dirname + '/' + projectName + '/res/js/'
	}
};

gulp.task('js', function(){
	return gulp.src(path.js.src)
		.pipe(webpack({
			devtool: 'source-map',
			entry: {
				app: path.js.src
			},
			output: {
				filename: '[name].js',
			},
			module: {
				loaders: [
					{
						test: /\.js$|\.jsx$/,
						loader: 'babel-loader',
						exclude: 'node_modules',
						query: {
							cacheDirectory: true,
							presets: ['es2015']
						}
					}
				]
			}
		}))
		// .pipe(uglify())
		.pipe(gulp.dest(path.js.dist));
});

gulp.task('watch', function(){
	gulp.watch(path.js.src, ['js']);
});

gulp.task('default', ['js', 'watch']);