import React, { Suspense } from "react";
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom';
import PrivateRoute from "./PrivateRoute";
import Loader from "../components/utill/Loader";
import { useSelector } from "react-redux";
import { RESTAURANT, USER } from "../common/constants";

const Welcome = React.lazy(() => import('../components/pages/Welcome/Welcome'))
const Login = React.lazy(() => import('../components/pages/Auth/Login.js'))
const Signup = React.lazy(() => import('../components/pages/Auth/Signup.js'))
const Dashboard = React.lazy(() => import('../components/pages/Dashboard/index'))
const RestaurantHome = React.lazy(() => import('../components/pages/RestaurantHome/RestaurantHome'))
const MenuItems = React.lazy(() => import('../components/pages/MenuItems/MenuItems'))
const Orders = React.lazy(() => import('../components/pages/Orders/Orders'))
const Profile = React.lazy(() => import('../components/pages/Profile/Profile'))
const Payment = React.lazy(() => import('../components/pages/Payment/Payment'))
const PaymentResponse = React.lazy(() => import('../components/pages/Payment/PaymentResponse'))

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
            path="/history"
            component={History}
            isAuthenticated={isAuthenticated && user?.userType == RESTAURANT}
          />
          <PrivateRoute
            exact
            path="/orders"
            component={Orders}
            isAuthenticated={isAuthenticated}
          />
          <PrivateRoute
            exact
            path="/profile"
            component={Profile}
            isAuthenticated={isAuthenticated}
          />
          <PrivateRoute
            exact
            path="/payment"
            component={Payment}
            isAuthenticated={isAuthenticated && user.userType == USER}
          />
          <Route
            exact
            path="/payment/:response"
            component={PaymentResponse}
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