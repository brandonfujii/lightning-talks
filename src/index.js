import 'babel-polyfill';
import 'whatwg-fetch';

import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import store, { history } from './store';


import App from './components/App';
import Vote from './components/Vote';
import SubmitTalk from './components/SubmitTalk';

const router = (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Vote} />
        <Route path="vote" component={Vote} />
        <Route path="submit" component={SubmitTalk} />
      </Route>
    </Router>
  </Provider>
)

render (
  router,
  document.getElementById('app')
);
