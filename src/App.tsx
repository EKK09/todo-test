import React from 'react';
import ReactDOM from 'react-dom';
import MainLayout from 'src/layout/MainLayout';

const App = (): React.ReactElement => (
  <MainLayout />
);

ReactDOM.render(
  <App />,
  document.getElementById('root'),
);
