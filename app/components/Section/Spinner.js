import React from 'react'

var Spinner = (props) => {
	return (
		<div className="sg-spinner" style={props.style}>
		  <div className="rect1"></div>
		  <div className="rect2"></div>
		  <div className="rect3"></div>
		  <div className="rect4"></div>
		  <div className="rect5"></div>
		</div>
	)
};

export default Spinner;