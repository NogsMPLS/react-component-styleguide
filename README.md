# React Component Styleguide

A mashup of [react-styleguide-generator-alt](https://github.com/theogravity/react-styleguide-generator-alt) and [ecology](https://github.com/FormidableLabs/ecology)

## Prereqs

* React 0.14.x. Install both `react` and `react-dom`.
* Was developed on node 4. Unsure if older node versions work or not.

## Installation

``` sh
npm install react-component-styleguide
```

## Quick Start

**NOTE:** By default Babel's `static` keyword is disabled. You can turn them on individually by passing `stage 0` as a [babelrc](https://babeljs.io/docs/usage/babelrc/) or [options.babelConfig](#babelconfig).

### Documenting your React components

The main point of this library is so taht you can just write comments on your react components and not have to actually create a whole separate 'docs' directory. This way you can keep your documentation right next to your actual code and keep it up to date as code changes.

For example, a Button component could be documented like this:
``` js
import React, { PropTypes } from 'react';
import ClassNames from 'classnames/bind';
import style from './button.css';

/**
 * Creates a reusable, customizable button.
 */
const Button = ({className, disabled, children, ...props}) => {

    const cx = ClassNames.bind(style);
    let classNames = cx({
        large,
        small,
        disabled,
        className
    });

    return <button {...props} className={classNames}>{children}</button>

};

Button.styleguide = {
  index: '1.1',
  category: 'Buttons',
  example: `
  <Button>Sample Button</Button>
  <Button disabled>Sample Disabled Button</Button>
  `
};

Button.propTypes = {
	/**
     * Anything that can be in a button. Usually text, but could also be icons/glyphs.
     * @examples 'Save', 'Cancel'
     */
  children: PropTypes.node,
    /**
     * define a custom css class name
     * @examples "btn", "btn-active"
     */
  className: PropTypes.string,
    /**
     * set button to disabled
     * @examples <Button disabled>
     */
  disabled: PropTypes.bool,
    /**
     * use outline styled button
     * @examples <Button outline>
     */
};

Button.defaultProps = {
  children: 'Default Button',
  className: '',
  disabled: false,
};

export default Button;

```
The styleguide static that is attached to Button in that example is only necessary for 2 things.

1. Navigation
  a. `index`: Reference to the element's position in the styleguide. (optional)
  b. `category`: Components category name. (optional)
2. Code Example
  a. `example`: Code example (optional). Not specifying this will auto-generate an example that is just `<Component></Component>`.
  b. `wrappedExample`: Wrapped component. Set to `true` if you need to render you component with wrapped state to really show a good example.

### Generating the documentation

#### Command line tool

A common usage example is below.

``` sh
# The default output to `styleguide` directory
rcs 'example/**/*.js'
```

Type `rcs -h` or `rcs --help` to get all the available options.

```
Usage: rcs [input] [options]

Options:
  -o, --output     Output directory            ['styleguide']
  -t, --title      Used as a page title        ['Style Guide']
  -r, --root       Set the root path           ['.']
  -f, --files      Inject references to files  ['']
  -c, --config     Use a js/json config file   ['styleguide.json']
  -p, --pushstate  Enable HTML5 pushState      [false]
  -v, --verbose    Verbose output              [false]
  -d, --dev        Start server with webpack hmr [3000]

Examples:
  rcs 'example/**/*.js' -t 'Great Style Guide' -f 'a.css, a.js' -v

  # Necessary to use a config file if you want to enable react-docgen
  rcs 'example/**/*.js' -c 'styleguide.json' -v

  # Example 2 - config file does module.exports = { ... }
  rcs 'example/**/*.js' -c 'styleguide.js' -v
```

#### Gulp

``` js
var gulp = require('gulp')
var RCS = require('react-component-styleguide')

gulp.task('styleguide', function (done) {
  var rcs = RCS('example/**/*.js', {
    output: 'path/to/dir',
    files: ['a.css', 'a.js']
  })

  rcs.generate(function (err) {
    if (err) {
      console.error(String(err))
    }

    done()
  })
})
```

#### Grunt

``` js
var RCS = require('react-component-styleguide')

grunt.registerTask('rcs', 'React style guide', function () {
  var done = this.async()

  try {
    var conf = grunt.config.get('rcs')

    RCS(conf.input, {
      config: conf.configFile,
      dev: false,
      verbose: true
    }).generate(function (err) {
      if (err) {
          grunt.log.error('Error: ' + err + ' ' + err.stack())
          return done(false)
      }

      grunt.log.ok('react styleguide generation complete')
      done()
    })
  } catch (e) {
    grunt.log.error('Error: ' + e + ' ' + e.stack)
    done(false)
  }
})
```

## API

### RCS(input, [options])

Returns a new RCS instance.

#### input

Type: `String`

Refers to [glob syntax](https://github.com/isaacs/node-glob) or it can be a direct file path.

#### options

##### output

Type: `String`  
Default: `'styleguide'`

Output directory path.

##### title

Type: `String`  
Default: `'Style Guide'`

Used as a page title and in the page header.

##### reactDocgen.files

Type: `Array`
Default: `input`

An array of `glob`-able file/paths for `react-docgen` to parse. If not specified, will default the value to `input`.

##### root

Type: `String`  
Default: `'.'`

Set the root path. For example, if the styleguide is hosted at `http://example.com/styleguide` the `options.root` should be `styleguide`.

##### files

Type: `Array`  
Default: `null`

Inject references to files. A usage example is:

``` js
{
  files: [
    '//maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css',
    'a.css',
    'a.js',
    'icon.svg'
  ]
}
```

Check for the existence of the files and only copy the files if it exists.

```
styleguide/files
├─ a.css
├─ a.js
└─ icon.svg
```

Inject file references into index.html if the files with the extension `.css` or `.js`.

``` html
<!doctype html>
<html>
  <head>
    …
    <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css">
    <link rel="stylesheet" href="files/a.css">
  </head>
  <body>
    …
    <script src="files/a.js"></script>
  </body>
</html>
```

##### config

Type: `String|Object`  
Default: `styleguide.json`

The entire range of RCS API options is allowed.

- An object can be passed instead of a filename that contains the RCS API options.
- A Javascript file can be passed in that exports an object instead:

```js
// styleguide.js
module.exports = {
  "title": "React Style Guide",
  "files": [
    "//maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css",
    "example/example.css"
  ],
  "babelConfig": {
    "stage": 0
  },
  "webpackConfig": {}
}
```

##### pushstate

Type: `String`  
Default: `false`

Enable HTML5 pushState. When this option is enabled, styleguide will use history API.

##### babelConfig

Type: `Object`  
Default: `null`

A usage example is below. See the [babel docs](http://babeljs.io/docs/usage/options/) for the complete list.

``` js
{
  babelConfig: {
    stage: 0
  }
}
```

##### webpackConfig

Type: `Object`
Default: `{}`

Uses `deepmerge` to merge in a custom webpack configuation to the rcs webpack configuration. Existing arrays (eg plugins) are appended to maintain functionality.

##### transpileIncludes

Type: `Array<String|RegExp>`
Default: `null`

Adds a custom rule(s) to the webpack loader to include additional items to transpile via `babel-loader`. This is provided as a convenience to using `webpackConfig` directly.

### rcs.generate([callback])

Generate the files and their dependencies into a styleguide output.

## Demo

Get the demo running locally:

``` sh
git clone git@github.com:NogsMPLS/react-component-styleguide.git
cd react-component-styleguide/
npm install
cd example/
npm install
npm start
```

Visit [http://localhost:3000/](http://localhost:3000/) in your browser.

## Remove the `styleguide` static for production

It is most likely that you will not have use for the `styleguide` static when you're using your component in production. To remove the static (and other unnecessary statics) during transpiling, use [babel-plugin-transform-react-remove-statics](https://www.npmjs.com/package/babel-plugin-transform-react-remove-statics)

## Thanks
Thank you to [theogravity](https://github.com/theogravity) for [react-styleguide-generator-alt](https://github.com/theogravity/react-styleguide-generator-alt), which most of the heavy lifitng of this app is forked from.

Thank you to [FormidableLabs](https://github.com/FormidableLabs) for [ecology](https://github.com/FormidableLabs/ecology) which produces the interactive editor this modules uses.
