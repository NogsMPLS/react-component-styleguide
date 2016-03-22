/*global document:false*/
import React from 'react'
import { render } from 'react-dom'
import { createHistory } from 'history'
import { Router, useRouterHistory } from 'react-router'
import routes from './routes'
import path from '../rcs-tmp/root-path'
import './index.css'

var root = path ? path : '/';

const browserHistory = useRouterHistory(createHistory)({
    basename: root
});

render(<Router routes={routes} history={ browserHistory } />, document.getElementById('app'));
