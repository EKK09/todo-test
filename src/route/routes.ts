import { lazy } from 'react';
import { RouteProps } from 'react-router-dom';

const routes: RouteProps[] = [
  {
    path: '/',
    exact: true,
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
