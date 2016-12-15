const webpack = require('webpack');

module.exports = {
    cache: true,
    devtool: 'inline-source-map',
    entry: [
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/only-dev-server',
      './src/admin.js'
    ],
    output: {
      path: __dirname + '/docs',
      publicPath: '/js/',
      filename: 'admin.js'
    },
    module: {
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loaders: ['react-hot-loader', 'babel'] },
            { test: /\.scss/, exclude: /node_modules/, loaders: ['style', 'css', 'sass'] }
        ]
    },
    resolve:{
        modulesDirectories: ['src', 'node_modules']
    },
    externals: {
        lodash: '_',
        firebase: 'firebase',
        react: 'React',
        'react-dom': 'ReactDOM',
        redux: 'Redux',
        mobx: 'mobx',
        'mobx-react': 'mobxReact'
    },
    devServer: {
      contentBase: './docs/',
      hot: true
    }
};
