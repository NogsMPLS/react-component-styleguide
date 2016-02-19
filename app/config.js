require('babel-core/register');

var glob = require('glob');

function RSG (input, opts) {
  opts['reactDocgen'] = opts['reactDocgen'] || {};

// files to parse for react-docgen
  this.reactDocGenFiles = this.getReactPropDocFiles();


  /**
   * Generates the files to process for react-docgen
   */
  RSG.prototype.getReactPropDocFiles = function () {
    var files = this.opts['reactDocgen'].files;
    var fileList = [];

    files.forEach(function (file) {
      fileList = fileList.concat(glob.sync(file, {realpath: true}))
    });

    // remove dupes
    return fileList.filter(function (elem, pos) {
      return fileList.indexOf(elem) === pos
    })
  }
}