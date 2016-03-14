import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './components/App'
import Sidebar from './components/Sidebar'
import Main from './components/Main'

module.exports = (
	<Route path="/" component={App}>
		<Route path="/search/:query" components={{ main: Main, sidebar: Sidebar }}/>
		<Route path="/:category" components={{ main: Main, sidebar: Sidebar }}>
			<Route path="/:category/:title" components={{ main: Main, sidebar: Sidebar }}/>
		</Route>
	</Route>
);
