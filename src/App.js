import React from 'react'
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import MainBody from './components/MainBody';
import Login from './components/Login';
import Register from './components/Register'
import Ping from './components/Ping'

function App() {
  return (
    <Router>
      <MainBody />
      <Login />
      <Register />
      <footer>
        <p>alpha 0.5</p>
      </footer>
    </Router>
  );
}

export default App;
