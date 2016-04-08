import React, { Component, PropTypes } from 'react'
import contents from '../../utils/contents'
import { Link } from 'react-router'

class NavListComponents extends Component {
	render() {
		return (
			<li>
				<Link
					className={`sg sg-nav-link ${this.props.isSelectedComponent ? 'is-selected' : ''}`}
					to={`/${this.props.category}/${this.props.component}`}
				>
					{this.props.component}
				</Link>
			</li>
		)
	}
}

export default NavListComponents;
