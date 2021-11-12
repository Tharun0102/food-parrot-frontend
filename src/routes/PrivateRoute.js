import React from "react";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ component: Component, isAuthenticated, ...children }) => {
  if (!isAuthenticated) {
    return <Redirect to="/" />
  }

  return <Route {...children} render={props => <Component {...props} {...children} />} />
};

export default PrivateRoute;