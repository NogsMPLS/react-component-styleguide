import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import Ecology from "ecology"
import * as docgen from "react-docgen"
import contents from '../../utils/contents'
import utils from '../../../lib/utils'
import reactPropMeta from '../../../res-tmp/propsdoc'


export default class Sections extends Component {
  static displayName = 'SG.Sections'

  static propTypes = {
    ctx: PropTypes.object.isRequired
  }

  getContents () {
    let params = this.props.ctx.params
    let data = {}

    if (params.query) {
      data = {
        query: params.query,
        keys: ['category', 'title', 'description', 'code']
      }
    } else if (params.category) {
      data = {
        query: params.title || params.category,
        keys: params.title ? ['title'] : ['category'],
        exact: true
      }
    }

    return contents.search(data)
  }

  render () {
    return (
      <div>
        {this.getContents().map((Content, i) => {
          // This exists so we can pull out the displayName for props documentation
          Content.styleguide._self = <Content />;
          var displayName = Content.styleguide._self.type.name;
          var readme = Content.styleguide && Content.styleguide.readme ? Content.styleguide.readme.default || Content.styleguide.readme: '';
          var docgenMeta = reactPropMeta[displayName];

          return (
            <section className='sg sg-section' key={i}>
               <Ecology
                  overview={readme}
                  source={docgenMeta}
                  scope={{ React, ReactDOM, [displayName]: Content }}
                  playgroundtheme="monokai"
                />
            </section>
          )
        })}
      </div>
    )
  }
}
