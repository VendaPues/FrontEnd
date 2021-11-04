import React, { useEffect } from "react";
import Welcome from "./screens/Welcome";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Home from "./screens/Home";
import Account from "./screens/Account";
import Products from "./screens/Products";
import Balance from "./screens/Balance";
import Sales from "./screens/Sales";
import CreateProduct from "./screens/CreateProduct";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import store from "./Store";
import { Provider } from "react-redux";

export default () => {

    useEffect(() => {
        const userInSession = (localStorage.getItem('user'));
        const storage = window.localStorage;
        if (!userInSession) {
            if (window.location.pathname != '/') {
                storage.clear();
                window.location.pathname = '/';
            }
        } else {
            let userObject = JSON.parse(userInSession);
            if (new Date() > new Date(userObject.expirationDate)) {
                if (window.location.pathname != '/') {
                    storage.clear();
                    window.location.pathname = '/';
                }
            }
        }
    }, []);

    return (
        <Provider store={store}>
            <Router>
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
                    <Route path="/" exact>
                        <Welcome />
                    </Route>
                </Switch>
            </Router>
        </Provider>
    );
};