import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //Remove this from index.js 
  //<React.StrictMode>
    <App />
  //</React.StrictMode>
);
