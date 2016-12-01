var folder = 'a11yFocus';

module.exports = {
	devtool: 'source-map',
	
	entry: {
		ui: __dirname + '/' + folder + '/src/ui.js'
	},
	
	output: {
		path: __dirname + '/' + folder + '/dist',
		filename: '[name].js'
	},
	
	watchOptions: {
		poll: true,
		aggregateTimeout: 1000
	},
	
	module: {
		loaders: [
			{
				test: /\.json$/,
				loader: 'json-loader'
			},
			{
				test: /\.js$|\.jsx$/,
				loader: 'babel',
				exclude: 'node_modules'
			}
		]
	}
};