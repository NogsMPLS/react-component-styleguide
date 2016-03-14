// component-requires.js is a generated file in rsg.js that contains
// the list of required user-defined components
import Components from '../../res-tmp/component-requires'
import reactPropMeta from '../../res-tmp/propsdoc'

// for `commonStrict` module formatter
// https://babeljs.io/docs/usage/modules/#interop
let Contents = Components
  .map((Content) => Content.default || Content)
  .filter((Component) => Component.styleguide)
// compare index numbers
  .sort((a, b) => {
    a = a.styleguide.index
    b = b.styleguide.index

    return !a ? 1 : !b ? -1 : a.toString().localeCompare(b)
  })
  //create example readme if not included for ecology live demo
  .map((Component) => {
    if (reactPropMeta[Component.name]) {

        Component.styleguide.title = Component.styleguide.title || Component.name;
        var description = Component.styleguide.description || reactPropMeta[Component.name].description;
        var code = Component.styleguide.example || '\n<' + Component.name + '></' + Component.name + '>\n';
        Component.styleguide.readme =   '# ' + Component.styleguide.title + '\n' +
                                        '```playground\n' +
                                        code +
                                        '```\n' +
                                        description + '\n' +
                                        '### Props';
         return Component
    } else {
        return Component
    }
  });

export default {
  /**
   * @type {string[]}
   */
  navList: (() => {
    const components = {}

    const categories = Contents
      .map((Content) => {
        const styleguide = Content.styleguide

        components[styleguide.category] = components[styleguide.category] ? components[styleguide.category] : []
        components[styleguide.category].push(styleguide.title)

        return Content.styleguide.category
      })
      .filter((category, i, categories) => categories.indexOf(category) === i)

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
  }
}
