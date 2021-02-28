import React from 'react'
import './App.css';
import Post from './components/Post';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'

function App() {
  return (
    <Router>
      <h1>Test Post the posts MERN</h1>
      <Post />
    </Router>
  );
}

export default App;
