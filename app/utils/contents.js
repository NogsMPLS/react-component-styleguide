// component-requires.js is a generated file in rsg.js that contains
// the list of required user-defined components
import Components from '../../rcs-tmp/component-requires'
import reactPropMeta from '../../rcs-tmp/propsdoc'

// for `commonStrict` module formatter
// https://babeljs.io/docs/usage/modules/#interop
let Contents = Components
  .map((Content) => Content.default || Content)
 .sort((a, b) => {

   a.styleguide = a.styleguide ? a.styleguide : {};
   b.styleguide = b.styleguide ? b.styleguide : {};

   a.styleguide.index = a.styleguide.index ? a.styleguide.index : '99.1';
   b.styleguide.index = b.styleguide.index ? b.styleguide.index : '99.1';

   a = a.styleguide.index;
   b = b.styleguide.index;

   return !a ? 1 : !b ? -1 : a.toString().localeCompare(b)
 })
  .map((Component) => {
  //IE fix for Component.name
  var componentName = Component.name ? Component.name : /^function\s+([\w\$]+)\s*\(/.exec( Component.toString() )[ 1 ];
    if (reactPropMeta[componentName]) {
        var description;
        var code;

        Component.styleguide = Component.styleguide || {};

        Component.styleguide.title = Component.styleguide.title ? Component.styleguide.title : componentName;

        description = Component.styleguide.description ? Component.styleguide.description : reactPropMeta[componentName].description;

        if ( !Component.styleguide.example ) {
            var propString = '';
            var childrenString = '';
            for (var key in reactPropMeta[componentName].props) {
                if (key != "children" && reactPropMeta[componentName].props[key].required && reactPropMeta[componentName].props[key].defaultValue){
                    propString += ` ${key}=${reactPropMeta[componentName].props[key].defaultValue.value}`
                } else if (key == "children" && reactPropMeta[componentName].props[key].defaultValue) {

                    if (reactPropMeta[componentName].props[key].defaultValue.value.substr(0, 1) === "'" && reactPropMeta[componentName].props[key].defaultValue.value.substr(-1) === "'"){
                        childrenString = '\n    '+reactPropMeta[componentName].props[key].defaultValue.value.slice(1, -1)+'\n';
                    } else {
                        childrenString = '\n    '+reactPropMeta[componentName].props[key].defaultValue.value+'\n';
                    }
                }
            }

            code = '\n<' + componentName + propString+'>'+childrenString+'</' + componentName + '>\n';
        } else if (Component.styleguide.example) {
            code = Component.styleguide.example;
        }
        Component.styleguide.description = description;
        Component.styleguide.code = code;
        Component.styleguide.wrappedExample = Component.styleguide.wrappedExample ? true : false;
        Component.styleguide.renderType = Component.styleguide.wrappedExample ? 'playground_norender' : 'playground';

        Component.styleguide.readme =   '# ' + Component.styleguide.title + '\n' +
                                        description + '\n' +
                                        '```'+Component.styleguide.renderType+'\n' +
                                        code +
                                        '```\n' +
                                        '### Properties';
         return Component
    } else {
        return Component
    }
  });

var contentObj = {
  /**
   * @type {string[]}
   */
  navList: (() => {
    const components = {}

    const categories = Contents
      .map((Content) => {
        const styleguide = Content.styleguide;
        styleguide.category = styleguide.category ? styleguide.category : 'Misc. Component List';
        components[styleguide.category] = components[styleguide.category] ? components[styleguide.category] : [];
        //IE fix.
        styleguide.title = styleguide.title ? styleguide.title : /^function\s+([\w\$]+)\s*\(/.exec( Content.toString() )[ 1 ];
        components[styleguide.category].push(styleguide.title);

        return Content.styleguide.category
      })
      .filter((category, i, categories) => categories.indexOf(category) === i);

    return {
      categories: categories,
      components: components
    }
  })(),

  /**
   * @param {Object=} data
   * @param {string=} data.query
   * @param {string[]=} data.keys
   * @param {boolean=} data.exact
   * @returns {ReactClass[]}
   */
  search (data) {
    data = data || {}

    let query = (data.query || '').trim().toLowerCase()
    let keys = data.keys || []
    let exact = !!data.exact
    let phrases = !exact ? query.split(' ') : null

    if (query === '') {
      return Contents
    }

    return Contents.filter((Content) => {
      return keys
        .filter((key) => !!Content.styleguide[key])
        .some((key) => {
          let val = Content.styleguide[key].toLowerCase()

          return exact ? val === query : phrases.every((phrase) => val.indexOf(phrase) !== -1)
        })
    })
  },

  allComponents: (() => {
    return Contents.reduce(function(prevVal, currentVal, idx) {
        var currentValName = currentVal.name ? currentVal.name : /^function\s+([\w\$]+)\s*\(/.exec( currentVal.toString() )[ 1 ];
        prevVal[currentValName] = currentVal;
        return prevVal;
      }, {})
  })()
};

export default contentObj;