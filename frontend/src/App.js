import React, { Fragment, useEffect } from "react";
import { Provider } from "react-redux";
import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";
import store from "./store";
import { loadUser } from './actions/auth'

import PrivateRoute from "./components/common/PrivateRoute";
import TodoList from "./components/TodoList";
import Login from "./components/accounts/Login";
import Register from "./components/accounts/Register";
import Header from "./components/Header";
import Alerts from "./components/common/Alerts";

// Alert options
const alertOptions = {
  timeout: 2000,
  position: "top center",
};

function App() {
  useEffect(() => {
    // Get user's token.
    store.dispatch(loadUser());
  });

  return (
    <Provider store={store}>
      <AlertProvider template={AlertTemplate} {...alertOptions}>
        <Router>
          <Fragment>
            <Header />
            <div className="container">
              <Switch>
                <PrivateRoute exact path="/" component={TodoList} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
              </Switch>
            </div>
          </Fragment>
        </Router>
      </AlertProvider>
    </Provider>
  );
}

export default App;
