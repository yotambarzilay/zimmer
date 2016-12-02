const webpack = require('webpack');

module.exports = {
    cache: true,
    entry: './src/admin.js',
    output: {
      path: __dirname + '/js',
      publicPath: '/',
      filename: 'admin.js'
    },
    module: {
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loaders: ['babel'] },
            { test: /\.scss/, exclude: /node_modules/, loaders: ['style', 'css', 'sass'] }
        ]
    },
    plugins: [
      new webpack.optimize.UglifyJsPlugin({minimize: true})
    ]
};
