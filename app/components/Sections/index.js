import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import Ecology from "../Section"
import * as docgen from "react-docgen"
import contents from '../../utils/contents'
import utils from '../../../lib/utils'
import reactPropMeta from '../../../rcs-tmp/propsdoc'

class Sections extends Component {
  getContents () {
    let params = this.props.params;
    let data = {};

    if (params && params.query) {
      data = {
        query: params.query,
        keys: ['category', 'title', 'description', 'code']
      }
    } else if (params && params.category) {
      data = {
        query: params.title || params.category,
        keys: params.title ? ['title'] : ['category'],
        exact: true
      }
    }

    return contents.search(data)
  }

  render () {
    var componentsObj = contents.search().reduce(function(prevVal, currentVal, idx) {
                                prevVal[currentVal.name] = currentVal;
                                return prevVal;
                              }, {});
    return (
      <div>
        {this.getContents().map((Content, i) => {
          // This exists so we can pull out the displayName for props documentation
          Content.styleguide._self = <Content />;
          var displayName = Content.styleguide._self.type.name;
          var readme = Content.styleguide && Content.styleguide.readme ? Content.styleguide.readme.default || Content.styleguide.readme: '';
          var docgenMeta = reactPropMeta[displayName];
          var scope = Object.assign({
            React,
            ReactDOM
          }, componentsObj);
          return (
            <section className='sg sg-section' key={i}>
               <Ecology
                  wrappedExample={Content.styleguide.wrappedExample}
                  overview={readme}
                  title={Content.styleguide.title}
                  description={Content.styleguide.description}
                  code={Content.styleguide.code}
                  source={docgenMeta}
                  scope={scope}
                  playgroundtheme="monokai"
                  idx={i}
                />
            </section>
          )
        })}
      </div>
    )
  }
}

Sections.displayName = 'SG.Sections';

export default Sections;
