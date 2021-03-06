import React, { useEffect } from 'react'
import './App.css';
import {Switch, Route, Link } from 'react-router-dom'
import MainBody from './components/MainBody';
import Login from './components/Login'
import Register from './components/Register'
import Profile from './components/Profile';
import UploadProfile from './components/UploadProfile';

function App() {

  return (
    <Switch>
      <Route exact path="/" component={MainBody} />
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/register">
        <Register />
      </Route>
      <Route path="/finishYourProfile">
        <UploadProfile />
      </Route>
      <Route path="/profile" component={Profile} />
      <Route path="/:notfound" >
        <p>404 not found</p>
      </Route>
      <footer>
        <p>alpha 0.75</p>
      </footer>
    </Switch>
  );
}

export default App;
