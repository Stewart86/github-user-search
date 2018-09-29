import React, { Component } from 'react';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import createBrowserHistory from "history/createBrowserHistory";
import AsyncComponent from "./components/AsyncComponent"

const AsyncHome = AsyncComponent(() => import("./components/Home"))
const AsyncUserPage = AsyncComponent(() => import("./components/UserPage"))
const AsyncNotFound = AsyncComponent(() => import("./components/NotFound"))


export const history = createBrowserHistory();


class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Router>
          <React.Fragment>
            <Switch>
              <Route exact path="/" component={AsyncHome}/>
              <Route path="/user/:id/:any" component={AsyncNotFound} />
              <Route path="/user/:id" component={AsyncUserPage} />
              <Route component={AsyncNotFound}/>
            </Switch>
          </React.Fragment>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
