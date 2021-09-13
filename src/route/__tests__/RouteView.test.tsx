import { render, waitFor, screen } from '@testing-library/react';
import React, { Suspense } from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import useUserStore from 'src/store/user';
import RouteView from '../RouteView';
import '@testing-library/jest-dom';
import routes from '../routes';

jest.mock('src/page/LoginPage', () => () => 'Mock-LoginPage');
jest.mock('src/page/HomePage', () => () => 'Mock-HomePage');
jest.mock('src/page/NotFoundPage', () => () => 'Mock-NotFoundPage');

describe('RouteView ', () => {
  const fooFallback = <div>fooFallback</div>;
  it('show LoginPage', async () => {
    const history = createMemoryHistory();
    history.push('/login');
    const { container, getByText } = render(
      <Router history={history}>
        <Suspense fallback={fooFallback}>
          <RouteView />
        </Suspense>
      </Router>,
    );

    await waitFor(() => {
      expect(container).toMatchSnapshot();
      expect(getByText('Mock-LoginPage')).toBeInTheDocument();
    });
  });

  describe('HomePage', () => {
    it('show LoginPage if user id has not been setted', async () => {
      useUserStore.setState({ id: null });

      const history = createMemoryHistory();
      history.push('/');
      const { container, getByText } = render(
        <Router history={history}>
          <Suspense fallback={fooFallback}>
            <RouteView />
          </Suspense>
        </Router>,
      );

      await waitFor(() => {
        expect(container).toMatchSnapshot();
        expect(getByText('Mock-LoginPage')).toBeInTheDocument();
      });
    });
    it('show HomePage if user id has been setted', async () => {
      useUserStore.setState({ id: 123 });

      const history = createMemoryHistory();
      history.push('/');
      const { container, getByText } = render(
        <Router history={history}>
          <Suspense fallback={fooFallback}>
            <RouteView />
          </Suspense>
        </Router>,
      );

      await waitFor(() => {
        expect(container).toMatchSnapshot();
        expect(getByText('Mock-HomePage')).toBeInTheDocument();
      });
    });
  });

  it('show NotFoundPage if no path matched', async () => {
    const fooPath = '/fooPath';
    const hasMatchPath: boolean = routes.some((route) => route.path === fooPath);

    expect(hasMatchPath).toBeFalsy();

    const history = createMemoryHistory();
    history.push(fooPath);
    const { container, getByText } = render(
      <Router history={history}>
        <Suspense fallback={fooFallback}>
          <RouteView />
        </Suspense>
      </Router>,
    );

    await waitFor(() => {
      expect(container).toMatchSnapshot();
      expect(getByText('Mock-NotFoundPage')).toBeInTheDocument();
    });
  });
});
