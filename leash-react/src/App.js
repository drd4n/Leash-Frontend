import React from 'react'
import './App.css';
import PostForm from './components/PostForm';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'
import Feed from './components/Feed';
import Navbar from './components/Navbar';
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
