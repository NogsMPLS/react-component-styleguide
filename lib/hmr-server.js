var path = require('path')
var express = require('express')
var webpack = require('webpack')
var slash = require('slash')

module.exports = function (webpackConfig, port, log, distDir, rootPath) {
  var app = express()
  var compiler = webpack(webpackConfig)
  var assetPath = rootPath ? slash(path.resolve(rootPath)) : '/';
  var basePath = rootPath ? slash(rootPath + '*') : '*';

  app.use('/files', express.static(path.join(distDir, 'files')))

  app.use(require('webpack-dev-middleware')(compiler, {
    colors: true,
    publicPath: assetPath
  }))

  app.use(require('webpack-hot-middleware')(compiler))

  app.get(basePath, function (req, res) {
    res.sendFile(path.join(distDir, 'index.html'))
  })

  app.listen(port, '0.0.0.0', function (err) {
    if (err) {
      log.error(err)
      return
    }

    log.info('Listening at http://localhost:' + port)
  })
}
