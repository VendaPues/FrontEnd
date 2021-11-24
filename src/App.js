import React, { useEffect, Suspense, lazy } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import store from "./Store";
import { Provider } from "react-redux";
import logo from "./assets/svg/logo.svg";

const Welcome = lazy(() => import("./screens/Welcome"));

const Login = lazy(() => import("./screens/Login"));

const Register = lazy(() => import("./screens/Register"));

const Home = lazy(() => import("./screens/Home"));

const Account = lazy(() => import("./screens/Account"));

const Products = lazy(() => import("./screens/Products"));

const Balance = lazy(() => import("./screens/Balance"));

const Sales = lazy(() => import("./screens/Sales"));

const CreateProduct = lazy(() => import("./screens/CreateProduct"));

const SaleResume = lazy(() => import("./screens/SaleResume"));

export default () => {
  useEffect(() => {
    const userInSession = localStorage.getItem("user");
    const storage = window.localStorage;
    if (!userInSession) {
      if (window.location.pathname !== "/") {
        storage.clear();
        window.location.pathname = "/";
      }
    } else {
      let userObject = JSON.parse(userInSession);
      if (new Date() > new Date(userObject.expirationDate)) {
        if (window.location.pathname !== "/") {
          storage.clear();
          window.location.pathname = "/";
        }
      }
    }
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Suspense
          fallback={
            <img src={logo} className="App-logo" alt="" width="100px" />
          }
        >
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/account">
              <Account />
            </Route>
            <Route path="/products">
              <Products />
            </Route>
            <Route path="/balance">
              <Balance />
            </Route>
            <Route path="/sales">
              <Sales />
            </Route>
            <Route path="/create-product">
              <CreateProduct />
            </Route>
            <Route path="/sale-resume">
              <SaleResume />
            </Route>
            <Route path="/" exact>
              <Welcome />
            </Route>
          </Switch>
        </Suspense>
      </Router>
    </Provider>
  );
};
