import React, { VFC } from "react";
import { Route, Switch, RouteProps } from "react-router-dom";

interface Props {
  routes: RouteProps[];
}

export const createRouter: VFC<Props> = ({ routes }) => {
  return (
    <Switch>
      {routes.map((route) => (
        <Route {...route} key={`route-key-${route.path}`} />
      ))}
    </Switch>
  );
};
