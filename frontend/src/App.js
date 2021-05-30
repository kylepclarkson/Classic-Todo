import React, { Fragment, useEffect } from "react";

import { Provider } from "react-redux"
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import "./App.css";
import store from "./store"

import PrivateRoute from "./components/PrivateRoute"
import TodoList from "./components/TodoList";
import Login from "./components/Login"
import Register from "./components/Register"

function App() {  

  useEffect(() => {
    // Get user's token. 
    // store.dispatch(loadUser());
  })

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <div className="container">
            <Switch>
              <PrivateRoute exact path="/" component={TodoList} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
            </Switch>
          </div>
        </Fragment>
      </Router>
    </Provider>
  )
  
}
   
export default App;
