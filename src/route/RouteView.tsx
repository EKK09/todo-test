import React from 'react';
import {
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import useUserStore from 'src/store/user';
import routes, { AuthRouteProps } from './routes';

const PrivateRoute = ({ component, ...rest }: AuthRouteProps) => {
  const userId = useUserStore((state) => state.id);
  return (
    <Route
      {...rest}
      render={({ location }) => (userId ? (
        component
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: location },
          }}
        />
      ))}
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
