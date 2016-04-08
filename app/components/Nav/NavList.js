import React, { Component, PropTypes } from 'react'
import contents from '../../utils/contents'
import NavListComponents from './NavListComponents';
import { Link } from 'react-router'

class NavList extends Component {
	render() {
		return (
			<li className='sg'>
				<Link
					className={`sg category sg-nav-link ${this.props.isSelectedCategory ? 'is-selected' : ''}`}
					to={`/${this.props.category}`}
					key={this.props.key}
				>
					{this.props.category}
				</Link>

				<ul className='sg sg-sub-nav'>
					{contents.navList.components[this.props.category].map((component, j) => {
						let isSelectedComponent = this.props.component === component;
						return <NavListComponents isSelectedComponent={isSelectedComponent} key={j} category={this.props.category} component={component}/>
					}, this)}
				</ul>
			</li>
		)
	}
}

export default NavList;
