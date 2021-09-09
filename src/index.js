import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Login from './components/Login';
import Ping from './components/Ping'

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App/>
    {/* <Switch>
        <Route path="/ping">
          <Ping />
        </Route>
        <Route path="/login" component={Login} />
        <Route path="/" component={App} />
      </Switch> */}
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
