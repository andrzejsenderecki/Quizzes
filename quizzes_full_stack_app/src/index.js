import React from 'react';
import ReactDOM from 'react-dom';
import { CookiesProvider } from 'react-cookie';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import store from './configureStore/store';

ReactDOM.render(
  <CookiesProvider>
      <Provider store={store}>
          <App />
      </Provider>
  </CookiesProvider>,
document.getElementById('root'));