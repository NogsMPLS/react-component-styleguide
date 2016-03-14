import React, { Component, PropTypes } from 'react'
import contents from '../../utils/contents'
import { Link } from 'react-router'
import NavList from './NavList'

class Nav extends Component {
  render () {
    return (
      <nav>
        <ul className='sg sg-nav'>

          <li className='sg'>
            <Link
              className={`sg sg-nav-link`}
              to={'/'}
            >
              Show All
            </Link>
          </li>
          {contents.navList.categories.map((category, i) => {
            let isSelectedCategory = this.props.category === category;
            return <NavList isSelectedCategory={isSelectedCategory} category={category} key={i} component={this.props.component}/>
          })}
        </ul>
      </nav>
    )
  }
}

Nav.displayName = 'SG.Nav';

export default Nav;
