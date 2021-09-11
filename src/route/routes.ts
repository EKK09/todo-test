import { lazy } from 'react';
import { RouteProps } from 'react-router-dom';

export interface AuthRouteProps extends RouteProps {
    requireAuth?: boolean;
}

const routes: AuthRouteProps[] = [
  {
    path: '/',
    exact: true,
    requireAuth: true,
    component: lazy(() => import('src/page/HomePage')),
  },
  {
    path: '/login',
    component: lazy(() => import('src/page/LoginPage')),
  },
  {
    path: '*',
    component: lazy(() => import('src/page/NotFoundPage')),
  },
];

export default routes;
