import React, { Suspense } from "react";
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom';
import PrivateRoute from "./PrivateRoute";
import Loader from "../components/utill/Loader";
import { useSelector } from "react-redux";
import { RESTAURANT, USER } from "../constants/constants";

const Welcome = React.lazy(() => import('../components/pages/Welcome/Welcome'))
const Login = React.lazy(() => import('../components/pages/Auth/Login.js'))
const Signup = React.lazy(() => import('../components/pages/Auth/Signup.js'))
const Dashboard = React.lazy(() => import('../components/pages/Dashboard/index'))
const RestaurantHome = React.lazy(() => import('../components/pages/RestaurantHome/RestaurantHome'))
const Requests = React.lazy(() => import('../components/pages/Requests/requests'))
const Scheduled = React.lazy(() => import('../components/pages/Scheduled/scheduled'))
const History = React.lazy(() => import('../components/pages/History/history'))
const MenuItems = React.lazy(() => import('../components/pages/MenuItems/MenuItems'))
const Orders = React.lazy(() => import('../components/pages/Orders/Orders'))

const AppRouter = () => {
  const user = useSelector((state) => state.user);
  const isAuthenticated = user?.isLogged;
  return (
    <Suspense fallback={<Loader />}>
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/login/:type"
            component={Login}
          />
          <Route
            exact
            path="/signup/:type"
            component={Signup}
          />
          <Route
            exact
            path="/dashboard/:type"
            component={Dashboard}
          />
          <Route
            exact
            path="/Restaurant/:id"
            component={RestaurantHome}
          />
          <PrivateRoute
            exact
            path="/menuItems"
            component={MenuItems}
            isAuthenticated={isAuthenticated && user?.userType == RESTAURANT}
          />
          <PrivateRoute
            exact
            path="/requests"
            component={Requests}
            isAuthenticated={isAuthenticated && user?.userType == RESTAURANT}
          />
          <PrivateRoute
            exact
            path="/scheduled"
            component={Scheduled}
            isAuthenticated={isAuthenticated && user?.userType == RESTAURANT}
          />
          <PrivateRoute
            exact
            path="/history"
            component={History}
            isAuthenticated={isAuthenticated && user?.userType == RESTAURANT}
          />
          <PrivateRoute
            exact
            path="/orders"
            component={Orders}
            isAuthenticated={isAuthenticated && user?.userType == USER}
          />
          <Route
            exact
            path="/"
            component={Welcome}
          />
          <Redirect from="*" to="/" />
        </Switch>
      </BrowserRouter>
    </Suspense>
  );
};

export default AppRouter;