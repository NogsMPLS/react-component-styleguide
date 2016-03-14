import React, { Component, PropTypes } from 'react'

class Container extends Component {
  render () {
    return (
      <div className='sg-container'>
        {this.props.children}
      </div>
    )
  }
}

Container.displayName = 'SG.Container';
Container.propTypes = {
  children: PropTypes.node
};

export default Container;
