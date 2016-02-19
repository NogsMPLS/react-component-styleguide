import React, { Component, PropTypes } from 'react'
import Ecology from "ecology";
import * as docgen from "react-docgen";

export default class Section extends Component {
  static displayName = 'SG.Section'

  static propTypes = {
    category: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    code: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.node,
    // Array of props/children that are used to create additional examples
    examples: PropTypes.array,
    // React element class used for rendering additional examples
    exampleComponent: PropTypes.func,
    // Reference to the example component
    _self: PropTypes.object,
    // Id number of the section; used for caching/highlighting purposes
    _id: PropTypes.number.isRequired
  }

  static defaultProps () {
    return {
      examples: []
    }
  }

  render () {
    return (
      <section className='sg sg-section'>
        <Ecology
          overview={require("!!raw!../components/avatar/docs.md")}
          source={docgen.parse(require("!!raw!../components/avatar/Avatar"))}
          scope={{ React, ReactDOM, exampleComponent }}
          playgroundtheme="monokai"
        />
      </section>
    )
  }
}
