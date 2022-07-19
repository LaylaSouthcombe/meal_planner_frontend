import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
// import reducer from './reducers/reducer';
import store from './store';
// const store = createStore(reducer)

const apiKey = "a321e3e0f535440fa1fa1c5d16a7b0a0"

export default apiKey

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
);
