import React, { Component, PropTypes } from 'react'
import Sections from '../Sections'

export default class Main extends Component {
  render () {
    return (
      <main className='sg-main'>
        <Sections {...this.props} />
      </main>
    )
  }
}

