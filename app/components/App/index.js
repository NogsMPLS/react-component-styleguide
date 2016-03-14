import React, { Component, PropTypes } from 'react'
import Container from '../Container'
import Sidebar from '../Sidebar'
import Main from '../Main'

export default class App extends Component {
  render () {
    const { main, sidebar } = this.props;

    return (
      <Container>
        { sidebar || <Sidebar /> }
        { main || <Main />}
      </Container>
    )
  }
}

