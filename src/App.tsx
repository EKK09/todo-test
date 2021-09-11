import React from 'react';
import ReactDOM from 'react-dom';
import MainLayout from 'src/layout/MainLayout';
import { Router } from 'react-router';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();
const App = (): React.ReactElement => (
  <MainLayout />
);

ReactDOM.render(
  <Router history={history}>
    <App />
  </Router>,
  document.getElementById('root'),
);
