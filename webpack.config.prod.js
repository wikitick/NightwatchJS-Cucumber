import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('production'),
  __DEV__: false
};

export default {
  debug: true,
  devtool: 'source-map', // more info:https://webpack.github.io/docs/build-performance.html#sourcemaps and https://webpack.github.io/docs/configuration.html#devtool
  noInfo: true, // set to false to see a list of every file being bundled.
  entry: './src/index',
  target: 'web', // necessary per https://webpack.github.io/docs/testing.html#compile-and-test
  output: {
    path: `${__dirname}/dist`,
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin(GLOBALS), // Tells React to build in prod mode. https://facebook.github.io/react/downloads.html
    new ExtractTextPlugin('styles.css'),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin()
  ],
  module: {
    loaders: [
      {test: /\.js$/, include: path.join(__dirname, 'src'), loaders: ['babel']},
      {test: /\.eot(\?[a-z0-9=\.]+)?$/, loader: 'file'},
      {test: /\.(woff|woff2)(\?[a-z0-9=\.]+)?$/,  loader: "url?limit=10000&mimetype=application/font-woff"},
      {test: /\.ttf(\?[a-z0-9=\.]+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
      {test: /\.svg(\?[a-z0-9=\.]+)?$/, loader: 'file?limit=10000&mimetype=image/svg+xml'},
      {test: /\.(jpe?g|png|gif)$/i, loaders: ['file']},
      {test: /\.ico$/, loader: 'file-loader?name=[name].[ext]'},
      {
        test: /(\.css|\.scss)$/,
        //include: path.join(__dirname, 'src'),
        loader: ExtractTextPlugin.extract('css?sourceMap&!sass?sourceMap')
      }
    ]
  },
  externals: {
    'config':JSON.stringify(require('./src/config/config.prod.js'))
  }
};
