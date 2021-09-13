import { lazy } from 'react';
import { RouteProps } from 'react-router-dom';

export enum ROUTE_PATH {
  HOME = '/',
  LOGIN = '/login',
}

export interface AuthRouteProps extends RouteProps {
    requireAuth?: boolean;
}

const routes: AuthRouteProps[] = [
  {
    path: ROUTE_PATH.HOME,
    exact: true,
    requireAuth: true,
    component: lazy(() => import('src/page/HomePage')),
  },
  {
    path: ROUTE_PATH.LOGIN,
    component: lazy(() => import('src/page/LoginPage')),
  },
  {
    path: '*',
    component: lazy(() => import('src/page/NotFoundPage')),
  },
];

export default routes;
