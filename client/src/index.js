import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter as Router,Link,Routes } from 'react-router-dom'
import store from './store'
import {Provider} from 'react-redux'
store.dispatch({type:"GET_STATE"})
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);

