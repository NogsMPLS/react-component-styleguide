/*global document:false*/
import React from 'react'
import { render } from 'react-dom'
import { Router, browserHistory} from 'react-router'
import routes from './routes'
import './index.css'

render(<Router routes={routes} history={ browserHistory } />, document.getElementById('app'));
