import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import Login from './components/Login';
import Register from './components/Register';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Login />
      <Register />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
