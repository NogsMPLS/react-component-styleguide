/*global document:false*/
import React from 'react'
import { render } from 'react-dom'
import { renderToStaticMarkup } from 'react-dom/server';
import { createHistory, createMemoryHistory } from 'history'
import { Router, useRouterHistory, RouterContext, match } from 'react-router'
import routes from './routes'
import path from '../rcs-tmp/root-path'
import template from '../lib/fixtures/index.html.mustache'
import './index.css'

var root = path ? path : '/';

// Client render (optional):
if (typeof document !== 'undefined') {
const browserHistory = useRouterHistory(createHistory)({
    basename: root
});
    render(<Router routes={routes} history={ browserHistory }/>, document.getElementById('app'));
}


// Exported static site renderer:
export default (locals, callback) => {
  const history = createMemoryHistory();
  const location = history.createLocation(locals.path);

  match({ routes, location }, (error, redirectLocation, renderProps) => {
    callback(null, template({
      html: renderToStaticMarkup(<RouterContext {...renderProps} />),
      root: locals.root,
      cssFils: locals.cssFils,
      jsFils: locals.jsFils
    }));
  });
};