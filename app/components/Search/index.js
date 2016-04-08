import React, { Component, PropTypes } from 'react'
import { browserHistory } from 'react-router'

class Search extends Component {
  constructor (props) {
    super(props)
  }

  static contextTypes = {
      router: function () {
        return React.PropTypes.func.isRequired;
      }
  };

  onSubmit (e) {
    e.preventDefault();
    const val = e.target.elements[1].value;
    const path = `/search/${val}`;
    //browserHistory.push(path)
    this.context.router.push(path)
  }

  render () {
    return (
      <form className='sg sg-search' onSubmit={this.onSubmit.bind(this)}>
        <button className='sg sg-search-submit' type='submit'>
          <i className='fa fa-search fa-fw' />
        </button>
        <input
          className='sg sg-search-input'
          type='text'
          placeholder='Search Components'
          autoFocus
        />
      </form>
    )
  }
}

Search.displayName = 'SG.Search';
Search.propTypes = {
  value: PropTypes.string,
  defaultValue: PropTypes.string
};

export default Search;
