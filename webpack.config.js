module.exports = {
	entry: './src/jquery-bem-utils.js',
	output: {
		path: './dist/',
		filename: 'jquery-bem-utils.js'
	},
	module: {
	  loaders: [
	    {
	      test: /\.js?$/,
	      exclude: /(node_modules|bower_components)/,
	      loader: 'babel?presets[]=es2015&cacheDirectory'
	    }
	  ]
	}
}