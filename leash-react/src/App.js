import React from 'react'
import './App.css';
import PostForm from './components/PostForm';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'
import Feed from './components/Feed';

function App() {
  return (
    <Router>
      <h1>Leash</h1>
      <PostForm />
      <Feed />
      <footer>
        <p>alpha 0.5</p>
      </footer>
    </Router>
  );
}

export default App;
