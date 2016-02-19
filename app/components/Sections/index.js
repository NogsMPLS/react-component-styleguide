import React, { Component, PropTypes } from 'react'
import Ecology from "ecology"
import * as docgen from "react-docgen"
import contents from '../../utils/contents'


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
          Content.styleguide._self = <Content />

          Content.styleguide._id = i

          // <Section {...Content.styleguide} key={i}>
          //     {Content.prototype.render && <Content {...this.props} />}
          //   </Section>
          // <Ecology
          //     overview={Content.styleguide.readme}
          //     source={docgen.parse(require(Content.styleguide.path))}
          //     scope={{ React, ReactDOM, Content }}
          //     playgroundtheme="monokai"
          //   />
          return (
            <section className='sg sg-section' key={i}>
               <Ecology
                  overview={Content.styleguide.readme}
                  source={docgen.parse(require('!!raw!' + Content.styleguide.path))}
                  scope={{ React, ReactDOM, Content }}
                  playgroundtheme="monokai"
                />
            </section>
          )
        })}
      </div>
    )
  }
}
