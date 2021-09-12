import React from 'react';
import {
  Switch,
  Route,
  Redirect,
  useLocation,
} from 'react-router-dom';
import useUserStore from 'src/store/user';
import routes, { AuthRouteProps } from './routes';

const PrivateRoute = (props: AuthRouteProps) => {
  const userId = useUserStore((state) => state.id);
  const location = useLocation();

  if (userId) {
    return (
      <Route {...props} />
    );
  }
  return (
    <Redirect
      to={{
        pathname: '/login',
        state: { from: location },
      }}
    />
  );
};

const RouteView = ():React.ReactElement => (
  <Switch>
    {routes.map(
      (route, index) => (route.requireAuth
        ? <PrivateRoute key={index} {...route} /> : <Route key={index} {...route} />),
    )}
  </Switch>
);

export default RouteView;
