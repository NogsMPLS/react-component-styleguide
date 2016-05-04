var autoprefixer = require('autoprefixer');
var cssnext = require('postcss-cssnext');
var postcssImport = require('postcss-import');
var path = require('path');

module.exports = {
  "title": "React Component Style Guide",
  "files": [
    "example.css"
  ],
  "babelConfig": {
    "stage": 0
  },
  "webpackConfig": {
    module: {
      loaders: [
        {
          test: /\.css$/,
          loader: 'style!css?sourceMap&modules&importLoaders=1&localIdentName=ra_[name]__[local]!postcss'
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
