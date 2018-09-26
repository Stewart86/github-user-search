import React, { Component } from 'react';

import SearchBox from './components/SearchBox';
import NavBar from './components/NavBar';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import createBrowserHistory from "history/createBrowserHistory";

import UserProfile from "./components/UserProfile"

export const history = createBrowserHistory();


class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar/>
        <Router>
          <React.Fragment>
            <Switch>
              <Route exact path="/" component={SearchBox}/>
              <Route path="/user/:id" component={UserProfile} />
            </Switch>
          </React.Fragment>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
