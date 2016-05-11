var autoprefixer = require('autoprefixer');
var cssnext = require('postcss-cssnext');
var postcssImport = require('postcss-import');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require('path');

module.exports = {
  "title": "React Component Style Guide",
  "files": [
    "example.css",
    "newStyles.css"
  ],
  "babelConfig": {
    "stage": 0
  },
  "webpackConfig": {
    module: {
      loaders: [
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract('style', 'css?sourceMap&modules&importLoaders=1&localIdentName=ra_[name]__[local]!postcss')
        },
        {
          test: /\.js$/,
          loader: 'babel-loader',
          query: {
            presets: ['react', 'es2015', 'stage-0']
          },
          include: [path.resolve(__dirname,'tools')]
        }
      ]
    },
    plugins: [
      new ExtractTextPlugin("newStyles.css", {
            allChunks: true
      })
    ],
    postcss (bundler) {
      return [
        postcssImport({
          addDependencyTo: bundler
        }),
        cssnext,
        autoprefixer
      ];
    }
  }
};
