import React from 'react'
import './App.css';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'
import MainBody from './components/MainBody';

function App() {
  return (
    <Router>
      <MainBody />
      <footer>
        <p>alpha 0.5</p>
      </footer>
    </Router>
  );
}

export default App;
